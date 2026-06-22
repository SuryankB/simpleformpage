from sqlalchemy import Column ,Integer ,String


from database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        index=True,
        primary_key=True,
        autoincrement=True

    )
     
    roll_no=Column(
        Integer,
        unique=True
    )
    name = Column(String)

    email = Column(
        String,
        unique=True
    )

    age = Column(Integer)