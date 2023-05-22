from pydantic import BaseModel
from fastapi import APIRouter

router = APIRouter(prefix="/devices", tags=["devices"])


@router.get("/")
async def devices():
    return ["device 1", "device 2", "device 3", "device 4", "device 5"]
