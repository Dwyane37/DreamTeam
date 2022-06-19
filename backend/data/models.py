from sqlalchemy import Column,String,Integer
from flask_sqlalchemy import SQLAlchemy
from app import app


db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'db_user'
    id=Column(Integer, primary_key=True,autoincrement=True)
    username = Column(String(255),nullable=False)
    password = Column(String(255),nullable=False)
    def __repr__(self):
        return '<User %r>' % self.username