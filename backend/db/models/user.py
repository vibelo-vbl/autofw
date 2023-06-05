from pydantic import BaseModel

class User(BaseModel):
    id: str | None
    name: str
    surname: str
    username: str
    email: str
    organization: str
    disabled: bool
    password: str
    superadmin: bool | None
    admin: bool
    image: str | None 

class User_Reply(BaseModel):
    id: str | None
    name: str
    surname: str
    username: str
    email: str
    organization: str
    disabled: bool
    admin: bool

class Create_User(BaseModel):
    name: str
    surname: str
    username: str
    email: str
    organization: str
    disabled: bool
    admin: bool
    password: str