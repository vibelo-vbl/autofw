from fastapi import APIRouter, HTTPException, status, Depends
from db.models.change import Change
from db.client import db_client
from db.schemas.change import change_schema, changes_schema
from bson import ObjectId
from jose import jwt, JWTError
from passlib.context import CryptContext
import bcrypt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from routers.users import search_user, auth_user, current_user
import json

router = APIRouter(prefix="/change", tags=["change"])


ALGORITHM = "HS256"
ACCESS_TOKEN_DURATION = 10
crypt = CryptContext(schemes=["bcrypt"])
SECRET = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
oauth2 = OAuth2PasswordBearer(tokenUrl="login")

#function to search changes
def search_change(field: str, key):
    try:
        change = db_client.local.change.find_one({field: key})
        return Change(**change_schema(change))
    except:
        return {"error": "No se ha encontrado el change"}
#function to search changes by range
def search_change_by_date(change_list: list, init_day: str, end_day: str):
    filter_changes = []
    init_month_date = datetime.strptime(init_day,"%Y-%m-%d").date()
    end_month_date = datetime.strptime(end_day,"%Y-%m-%d").date()
    for change in change_list:
        change_start_day = datetime.strptime(change['start'],"%Y-%m-%dT%H:%M:%S").date()
        change_end_day = datetime.strptime(change['end'],"%Y-%m-%dT%H:%M:%S").date()
        if end_month_date >= change_start_day and change_end_day >= init_month_date:
            filter_changes.append(change)
        else: 
            pass
    return filter_changes

@router.get("/changes",response_model=list[Change], status_code=status.HTTP_200_OK, dependencies=[Depends(current_user)])
async def changes():
    return changes_schema(db_client.local.change.find())

@router.get("/changes_range", response_model=list[Change], status_code=status.HTTP_200_OK, dependencies=[Depends(current_user)])
async def changes(start: str, end: str):
    change_list = changes_schema(db_client.local.change.find())
    return search_change_by_date(change_list, start, end)

# Path
@router.get("/{id}", response_model=Change,status_code=status.HTTP_200_OK, dependencies=[Depends(current_user)])
async def change(id: str ):
    return search_change("_id", ObjectId(id))

#Crear nuevo change
@router.post("/", response_model=Change, status_code=status.HTTP_201_CREATED, dependencies=[Depends(current_user)])
async def change(change: Change):
    if type(search_change("_id", change.id)) == Change:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Change ya existe")
    change_dict = dict(change)
    del change_dict["id"]
    id = db_client.local.change.insert_one(change_dict).inserted_id
    new_change = change_schema(db_client.local.change.find_one({"_id": id}))
    return Change(**new_change)