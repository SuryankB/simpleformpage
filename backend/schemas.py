from pydantic import BaseModel


class UserCreate(BaseModel):
    roll_no:int
    name: str
    email: str
    age: int

class UserUpdate(BaseModel):
    name: str
    email: str
    age: int

class UserResponse(BaseModel):
    id: int
    roll_no: int
    name: str
    email: str
    age: int

    class Config:
        from_attributes = True
