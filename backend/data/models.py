from sqlalchemy import Column,String,Integer,TIMESTAMP
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'db_user'
    id=Column(Integer, primary_key=True,autoincrement=True)
    username = Column(String(255),nullable=False)
    password = Column(String(255),nullable=False)
    mobile = Column(Integer)
    nickname = Column(String(255))
    sex = Column(Integer)
    country = Column(String(255))
    deleted = Column(Integer)
    create_time = Column(TIMESTAMP)
    update_time = Column(TIMESTAMP)
    tag = Column(String(255))
    photo = Column(String(255))
    email = Column(String(255))
    points = Column(Integer)

    def __repr__(self):
        return '<User %r>' % self.username