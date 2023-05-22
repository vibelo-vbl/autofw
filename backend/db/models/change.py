from pydantic import BaseModel, schema_json_of, Field
from datetime import datetime
from typing_extensions import TypedDict


class Change_Extended(TypedDict):
    number: str
    description: str
    assigment_group: str
    assigned_to: str
    category: str
    company: str
    priority: str
    risk: str
    impact: str
    service_offering: str
    configuration_item: str
    requested_by: str


class Change(BaseModel):
    id: str | None
    title: str
    start: datetime
    end: datetime
    extendedProps: Change_Extended
    
    
#print(Change.schema_json(indent=2))