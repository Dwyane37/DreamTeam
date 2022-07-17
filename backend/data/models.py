from sqlalchemy import Column, String, Integer, TIMESTAMP, TEXT, FLOAT
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import class_mapper

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'db_user'
    id = Column(String(255), primary_key=True)
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
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


# 简历信息
class ResumeUser(db.Model):
    __tablename__ = 'db_resume_user_info'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    university = Column(String(255))
    email = Column(String(255))
    user_id = db.Column(String(255), db.ForeignKey('db_user.id'))
    users = db.relationship('User', backref='users')

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns if c.name not in {"id", "user_id"}}


class ResumeEducation(db.Model):
    __tablename__ = 'db_resume_education'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    university = Column(String(255))
    start = Column(String(255))
    end = Column(String(255))
    faculty = Column(String(255))
    major = Column(String(255))
    grades = Column(FLOAT)
    degree = Column(String(255))
    user_id = db.Column(String(255), db.ForeignKey('db_user.id'))
    educations = db.relationship('User', backref='educations')

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns if c.name not in {"id", "user_id"}}


class ResumeWorkExperience(db.Model):
    __tablename__ = 'db_resume_workExperience'
    id = Column(Integer, primary_key=True, autoincrement=True)
    company = Column(String(255))
    position = Column(String(255))
    start = Column(String(255))
    end = Column(String(255))
    description = Column(TEXT)
    user_id = db.Column(String(255), db.ForeignKey('db_user.id'))
    works = db.relationship('User', backref='works')

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns if c.name not in {"id", "user_id"}}


class ResumeProjectExperience(db.Model):
    __tablename__ = 'db_resume_projectExperience'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    start = Column(String(255))
    end = Column(String(255))
    description = Column(TEXT)
    user_id = db.Column(String(255), db.ForeignKey('db_user.id'))
    projects = db.relationship('User', backref='projects')

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns if c.name not in {"id", "user_id"}}


class ResumeSkill(db.Model):
    __tablename__ = 'db_resume_skill'
    id = Column(Integer, primary_key=True, autoincrement=True)
    skill = Column(String(255))
    user_id = db.Column(String(255), db.ForeignKey('db_user.id'))
    skills = db.relationship('User', backref='skills')

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns if c.name not in {"id", "user_id"}}


class ResumeAward(db.Model):
    __tablename__ = 'db_resume_award'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255))
    description = Column(TEXT)
    user_id = db.Column(String(255), db.ForeignKey('db_user.id'))
    awards = db.relationship('User', backref='awards')

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns if c.name not in {"id", "user_id"}}


class ResumeProjectDisplay(db.Model):
    __tablename__ = 'db_resume_project_display'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    link = Column(String(255))
    user_id = db.Column(String(255), db.ForeignKey('db_user.id'))
    users = db.relationship('User', backref='displays')

    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns if c.name not in {"id", "user_id"}}


class Follow(db.Model):
    __tablename__ = 'db_follow'
    id = Column(Integer, primary_key=True, autoincrement=True)
    following_id = Column(String(255))
    follower_id = Column(String(255))
