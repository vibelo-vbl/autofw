from fastapi import FastAPI
from routers import devices, users, changes, login
from fastapi.staticfiles import StaticFiles
import subprocess
import os

app = FastAPI()

# Routers
app.include_router(devices.router)
app.include_router(users.router)
app.include_router(changes.router)
app.include_router(login.router)
app.mount("/", StaticFiles(directory="../automation-tool/build", html=True), name="static")


@app.on_event("startup")
def trigger_mongo_service():
     os.system("mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork")


# Inicia el server: uvicorn main:app --reload --host 0.0.0.0

# Documentacion con Redocly: http://35.234.65.109:8000/redoc
# Documentacion con Sagger: http://35.234.65.109:8000/docs



