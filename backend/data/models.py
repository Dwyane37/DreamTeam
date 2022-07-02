from sqlalchemy import Column,String,Integer,TIMESTAMP
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import class_mapper

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'db_user'
    id=Column(Integer, primary_key=True,autoincrement=True)
    username = Column(String(255),nullable=False)
    password = Column(String(255),nullable=False)
    mobile = Column(Integer)
    nickname = Column(String(255))
    type = Column(Integer)
    create_time = Column(TIMESTAMP)
    update_time = Column(TIMESTAMP)
    email = Column(String(255))
    deleted = Column(Integer)

    def __repr__(self):
        return '<User %r>' % self.username

    def as_dict(obj):
        return dict((col.name, getattr(obj, col.name)) \
                    for col in class_mapper(obj.__class__).mapped_table.c)