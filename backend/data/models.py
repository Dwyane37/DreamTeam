from sqlalchemy import Column,String,Integer,TIMESTAMP
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import class_mapper

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'db_user'
    id=Column(String(1000), primary_key=True)
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

class Internship(db.Model):
    __tablename__ = 'db_internships'
    id = Column(String(1000), primary_key=True)
    title = Column(String(255))
    user_id = Column(String(1000))
    content = Column(String(1000))
    type = Column(Integer)
    create_time = Column(TIMESTAMP)
    update_time = Column(TIMESTAMP)
    deleted = Column(Integer)
    view = Column(Integer)
    location = Column(String(255))
    field = Column(String(255))
    state = Column(String(255))
    city = Column(String(255))

    def __repr__(self):
        return '<Internship %r>' % self.id

    def as_dict(obj):
        return dict((col.name, getattr(obj, col.name)) \
                    for col in class_mapper(obj.__class__).mapped_table.c)

class Resume(db.Model):
    __tablename__ = 'db_resume'
    id = Column(String(1000), primary_key=True)
    user_id = Column(String(1000))
    name = Column(String(255))
    sex = Column(Integer)
    mobile = Column(String(1000))
    age = Column(Integer)
    address = Column(String(255))
    email = Column(String(1000))
    aim = Column(String(255))
    honor = Column(String(255))
    education = Column(String(255))
    experience = Column(String(1000))
    skills = Column(String(1000))
    create_time = Column(TIMESTAMP)
    update_time = Column(TIMESTAMP)
    deleted = Column(Integer)
    awards = Column(String(1000))
    display = Column(String(1000))
    field = Column(String(1000))

    def __repr__(self):
        return '<Resume %r>' % self.id

    def as_dict(obj):
        return dict((col.name, getattr(obj, col.name)) \
                    for col in class_mapper(obj.__class__).mapped_table.c)