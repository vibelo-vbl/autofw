from fastapi import APIRouter, HTTPException, status, Depends
from db.models.user import User, User_Reply, Create_User
from db.client import db_client
from db.schemas.user import user_schema, users_schema
from bson import ObjectId
from jose import jwt, JWTError
from passlib.context import CryptContext
import bcrypt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jmespath

router = APIRouter(prefix="/user", tags=["users"])

ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 10
crypt = CryptContext(schemes=["bcrypt"])
SECRET = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
oauth2 = OAuth2PasswordBearer(tokenUrl="auth/login")

#function to search user
def search_user(field: str, key):
    try:
        user = db_client.local.users.find_one({field: key})
        return User(**user_schema(user))
    except:
        return {"error": "No se ha encontrado el usuario"}

#function to check the token auth
async def auth_user(token: str = Depends(oauth2)):

    exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credenciales de autenticacion invalidas", headers={"WWW-Authenticate": "Bearer"})
    try:
        username = jwt.decode(token, SECRET, algorithms=[ALGORITHM]).get("sub")
        if username is None:
            raise exception
        
    except JWTError:
        raise exception
    
    return search_user("username", username)

#function to check authorization
async def current_user(user: User = Depends(auth_user)):
    # print(user)
    if user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Usuario inactivo")
    return user


async def admin_user(user: User = Depends(auth_user)):
    if not user.admin:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No permissions")
    return user

#get users
@router.get("/users", response_model=list[User_Reply], status_code=status.HTTP_200_OK, dependencies=[Depends(admin_user)])
async def users_by_organization(user: User = Depends(current_user)):
    if user.superadmin:
        return users_schema(db_client.local.users.find())
    return users_schema(db_client.local.users.find({ "organization": user.organization }))

#get users
@router.get("/org", status_code=status.HTTP_200_OK, dependencies=[Depends(current_user)])
async def obtain_organization():
    users = users_schema(db_client.local.users.find())
    return list(set(jmespath.search('[*].organization', users))) 

#get parameters of current user auth
@router.get("/me")
async def me(user: User = Depends(current_user)):
    user_dict = dict(user)
    del user_dict["password"]
    return user_dict

# Path
@router.get("/{id}", response_model=User_Reply, status_code=status.HTTP_200_OK, dependencies=[Depends(current_user)])
async def user(id: str ):
    try:
        return search_user("_id", ObjectId(id))
    except:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No Found") 

    

# Query
@router.get("/", response_model=User_Reply, status_code=status.HTTP_200_OK, dependencies=[Depends(current_user)])
async def user(id: str):
    return search_user("_id", ObjectId(id))

#Crear nuevo usuario
@router.post("/", response_model=User_Reply, status_code=status.HTTP_201_CREATED, dependencies=[Depends(current_user), Depends(admin_user)] )
async def user(user: Create_User):
    if type(search_user("email", user.email)) == User:
       raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="El usuario ya existe")
    user_dict = dict(user)
    # del user_dict["id"]
    password = user_dict["password"]
    hash = crypt.hash(password)
    user_dict["password"] = hash

    id = db_client.local.users.insert_one(user_dict).inserted_id
    new_user = user_schema(db_client.local.users.find_one({"_id": id}))
    return User(**new_user)

#modificar un usuario
@router.put("/{id}", response_model=User, dependencies=[Depends(current_user), Depends(admin_user)])
async def user(id:str, user: User):
    user_dict = dict(user)
    del user_dict["id"]
    password = user_dict["password"]
    hash = crypt.hash(password)
    user_dict["password"] = hash
    try:
        db_client.local.users.find_one_and_replace({"_id": ObjectId(id)}, user_dict)
    except:
        return {"error": "No se ha actualizado el usuario"}
    return search_user("_id", ObjectId(user.id))

#modificar tu usuario
@router.put("/edit_user/{id}", dependencies=[Depends(current_user)])
async def edit_my_user(id: str, user: User, my_user: User = Depends(current_user)):
    if user.username != my_user.username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No permissions")
    user_dict = dict(user)
    del user_dict["id"]
    password = user_dict["password"]
    hash = crypt.hash(password)
    user_dict["password"] = hash
    try:
        found = db_client.local.users.find_one_and_replace({"_id": ObjectId(id)}, user_dict)
    except:
        return {"error": "No se ha actualizado el usuario"}
    if not found:
        return {"error": "No se ha actualizado el usuario"}
    return {"modified": id}

# Eliminar un usuario
@router.delete("/{id}", status_code=status.HTTP_200_OK, dependencies=[Depends(current_user), Depends(admin_user)])
async def user(id: str):
    found = db_client.local.users.find_one_and_delete({"_id": ObjectId(id)})
    if not found:
        return {"error": "No se ha actualizado el usuario"}
    return {"deleted": id}







