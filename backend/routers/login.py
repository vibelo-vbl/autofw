from fastapi import APIRouter, HTTPException, status, Depends
from db.models.user import User
from db.client import db_client
from db.schemas.user import user_schema, users_schema
from bson import ObjectId
from jose import jwt, JWTError
from passlib.context import CryptContext
import bcrypt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["auth"])

ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 10
crypt = CryptContext(schemes=["bcrypt"])
SECRET = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
#oauth2 = OAuth2PasswordBearer(tokenUrl="login")

#function to search user
def search_user(field: str, key):
    try:
        user = db_client.local.users.find_one({field: key})
        return User(**user_schema(user))
    except:
        return {"error": "No se ha encontrado el usuario"}


@router.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):

    if type(search_user("username", form.username)) is dict:
       raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="El usuario no es correcto")
    user = search_user("username", form.username)

    if not crypt.verify(form.password, user.password):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La contrasena no es correcta")
    
    if user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Usuario inactivo")
    
    access_token = {"sub": user.username, "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_DURATION)}

    return{"access_token": jwt.encode(access_token, SECRET, algorithm=ALGORITHM), "token_type": "bearer", "admin": user.admin}