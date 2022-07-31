import datetime

from sqlalchemy import desc
import pymysql
from data.models import Review
from interface.reviewApi import *
from utils.exceptionMessage import *
from utils.generator import *

DB_CONFIG = { #---根据在你电脑上的schema名字改
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "passwd": "123456",
    # "db": "Sleep_project1",
    "db": "db",
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

# def getMovieReviewById(id):
#     try:
#
#         res = Review.query.filter_by(movie_id=id).all()
#         return res
#
#     except Exception as e:
#         print(e)
#
# def changelike(id, review_id):
#     try:
#         tmup = Thumbup.query.filter_by(user_id=id, review_id=review_id).first()
#         if tmup is None:
#             newtmup = Thumbup(id=getuuid(),
#                               user_id=id,
#                               review_id=review_id,
#                               deleted=0)
#             rev = Review.query.get(review_id)
#             rev.likes = rev.likes + 1
#             db.session.add(newtmup)
#             db.session.commit()
#
#         elif tmup.deleted == 0:
#             tmup.deleted = 1
#             db.session.commit()
#             review = Review.query.get(review_id)
#             review.likes = review.likes - 1
#             db.session.commit()
#
#         elif tmup.deleted == 1:
#             tmup.deleted = 0
#             db.session.commit()
#             review = Review.query.get(review_id)
#             review.likes = review.likes + 1
#             db.session.commit()
#
#     except Exception as e:
#         print(e)
#
# def getAllReviewsByTime(user_id,id):
#     conn = pymysql.connect(
#         host=DB_CONFIG["host"],
#         port=DB_CONFIG["port"],
#         user=DB_CONFIG["user"],
#         passwd=DB_CONFIG["passwd"],
#         db=DB_CONFIG["db"],
#         charset=DB_CONFIG["charset"]
#     )
#     try:
#         cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
#         sql = "SELECT db_user.nickname, db_user.photo, db_review.id, db_review.content, db_review.mark, db_review.likes,db_review.user_id  FROM db_review LEFT JOIN db_movie ON db_movie.id = db_review.movie_id LEFT JOIN db_user on db_user.id = db_review.user_id WHERE db_movie.id = {}  and db_review.deleted = 0 and db_review.user_id NOT IN ( SELECT u_id FROM banned WHERE user_id = '{}' AND deleted = 1 ) ORDER BY db_review.update_time DESC;".format(
#             id,user_id)
#         cursor.execute(sql)  # ASC
#         result = cursor.fetchall()
#         conn.close()
#         return result
#     except Exception as e:
#         print(e)
#
# def getAllReviewsByHot(user_id, id):
#     conn = pymysql.connect(
#         host=DB_CONFIG["host"],
#         port=DB_CONFIG["port"],
#         user=DB_CONFIG["user"],
#         passwd=DB_CONFIG["passwd"],
#         db=DB_CONFIG["db"],
#         charset=DB_CONFIG["charset"]
#     )
#     try:
#         cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
#         sql = "SELECT db_user.nickname, db_user.photo, db_review.id, db_review.content, db_review.mark, db_review.likes,db_review.user_id  FROM db_review LEFT JOIN db_movie ON db_movie.id = db_review.movie_id LEFT JOIN db_user on db_user.id = db_review.user_id WHERE db_movie.id = {} and db_review.deleted = 0 and db_review.user_id NOT IN ( SELECT u_id FROM banned WHERE user_id = '{}' AND deleted = 1 ) ORDER BY db_review.likes DESC;".format(
#             id, user_id)
#         cursor.execute(sql)  # ASC
#         result = cursor.fetchall()
#         conn.close()
#         return result
#     except Exception as e:
#         print(e)
#
# def gain_experience(id):
#     try:
#         user = User.query.get(id)
#         user.points = user.points + 10
#         db.session.commit()
#     except Exception as e:
#         print(e)
#
# def getThumbsOfReview(user_id, id):
#     conn = pymysql.connect(
#         host=DB_CONFIG["host"],
#         port=DB_CONFIG["port"],
#         user=DB_CONFIG["user"],
#         passwd=DB_CONFIG["passwd"],
#         db=DB_CONFIG["db"],
#         charset=DB_CONFIG["charset"]
#     )
#     try:
#         cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
#         sql = "SELECT db_review.id  FROM db_review LEFT JOIN db_thumb_up ON db_review.id = db_thumb_up.review_id WHERE db_thumb_up.user_id = {} and db_review.movie_id = {} and db_thumb_up.deleted = 0;".format(
#             user_id, id)
#         cursor.execute(sql)  # ASC
#         result = cursor.fetchall()
#         conn.close()
#         return result
#
#     except Exception as e:
#         print(e)