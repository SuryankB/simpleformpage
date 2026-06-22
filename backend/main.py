from fastapi import FastAPI
from fastapi import Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import Base
from database import engine
from database import get_db

from schemas import UserCreate
from schemas import UserResponse
from schemas import UserUpdate

from crud import create_user
from crud import get_users
from crud import delete_user,update_user

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post(
    "/users",
    response_model=UserResponse
)
def add_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    return create_user(
        db,
        user.roll_no,
        user.name,
        user.email,
        user.age
    )


@app.get(
    "/users",
    response_model=list[UserResponse]
)
def read_users(
    db: Session = Depends(get_db)
):
    return get_users(db)


@app.delete("/users/{roll_no}")
def remove_user(
    roll_no:int,
    db=Depends(get_db)
):
    name=delete_user(
        db,
        roll_no
    )

    return {
        "message":
        f'Student {name} deleted'
    }

@app.put("/users/{roll_no}",
    response_model=UserResponse
)
def edit_user(
    roll_no: int,
    user: UserUpdate,
    db: Session = Depends(get_db)
):

    updated_user = update_user(
        db,
        roll_no,
        user.name,
        user.email,
        user.age
    )

    return updated_user