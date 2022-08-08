import datetime

from sqlalchemy import desc
import pymysql
from data.models import Review
from interface.reviewApi import *
from utils.exceptionMessage import *
from utils.generator import *

DB_CONFIG = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "passwd": "123456",
    # "db": "Sleep_project1",
    "db": "intern",
    "charset": "utf8"
}

def review_internship(id,review,internship_id,parent_id):
    try:
        newReview = Review(id=getuuid(), user_id=id,
                           internship_id=internship_id,
                           content=review,
                           deleted=0,
                           parent_id=parent_id,
                           create_time=getTime(datetime),
                           update_time=getTime(datetime))
        db.session.add(newReview)
        db.session.commit()
    except Exception as e:
        print(e)

def delete_review(id):
    try:
        review = Review.query.get(id)
        review.deleted = 1
        res = Review.query.filter_by(parent_id=id).all()
        if res is not None:
            for rev in res:
                delete_review(rev.id)
        db.session.commit()
    except Exception as e:
        print(e)

def getAllReviewsById(id):
    try:
        res = db.session.query(Internship.title, Internship.user_id, Internship.content,
                               Internship.id,
                               Review.content,
                               Review.update_time).outerjoin(Review, Review.internship_id == Internship.id)\
            .filter(
            Review.user_id == id, Review.deleted == 0)
        return res
    except Exception as e:
        print(e)

def getInternReviewById(id):
    try:
        res = db.session.query(Review.id,Review.user_id,Review.internship_id,Review.content,Review.update_time,Review.parent_id,
                         ResumeUser.name, ResumeUser.thumbnail).outerjoin(Internship,Review.internship_id == Internship.id).outerjoin(
            ResumeUser,ResumeUser.user_id == Review.user_id
        ).filter(Internship.id==id,Review.deleted==0)
        return res

    except Exception as e:
        print(e)
