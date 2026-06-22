from sqlalchemy.orm import Session
from models import User

def delete_user(
    db: Session,
    roll_no: int
):
    user = (
        db.query(User)
        .filter(User.roll_no == roll_no)
        .first()
    )
    name=user.name;
    if user:
        db.delete(user)
        db.commit()

    return name

def create_user(
    db: Session,
    roll_no: int,
    name: str,
    email: str,
    age: int
):
    user = User(
        roll_no=roll_no,
        name=name,
        email=email,
        age=age
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user

def update_user(
    db: Session,
    roll_no: int,
    name: str,
    email: str,
    age: int
):
    user = (
        db.query(User)
        .filter(User.roll_no == roll_no)
        .first()
    )

    if not user:
        return None

    user.name = name
    user.email = email
    user.age = age

    db.commit()

    db.refresh(user)

    return user


def get_users(db: Session):
    return db.query(User).all()