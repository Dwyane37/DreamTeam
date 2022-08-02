import jwt

from data.models import *
from flask import Blueprint
from flask import request
from service.reviewService import *
from utils.email import *
import json

from utils.exceptionMessage import errorMessage

token_key = 'dreamTeam'
review_opt = Blueprint('review_opt', __name__)

@review_opt.route("/review",methods=['GET', 'POST'] )
def review():
    data = json.loads(request.data)
    token = data['token']
    deco = jwt.decode(token, token_key, algorithms='HS256')
    id = deco['id']
    review = data['review']
    internship_id = data['internship']
    parent_id = data['parent_id']
    # message = checkIfUserReviewed(id,movie_id)
    # if message.errortype == 1:
    #     return json.dumps(message,default=lambda obj: obj.__dict__)

    review_internship(id,review,internship_id,parent_id)

    # gain experience
    # gain_experience(id)

    return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

@review_opt.route("/deletereview", methods=['GET'])
def deletereview():
    id = request.values.get("id")
    delete_review(id)
    return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

@review_opt.route("/personreview", methods=['GET'])
def personreview():
    # token = request.values.get('token')
    # deco = jwt.decode(token, token_key, algorithms='HS256')
    id = request.values.get('id')
    res = getAllReviewsById(id)
    res = [dict(zip(result.keys(), result)) for result in res]
    data = {}
    data['data'] = res
    data['errortype'] = 200
    return data

@review_opt.route("/internshipreview", methods=['GET'])
def internshipreview():
    id = request.values.get("movie_id")
    res = getInternReviewById(id)
    dict = {}
    for i in res:
        dict[repr(i.id)] = i.as_dict()
    return dict

# @review_opt.route("/like", methods=['GET'])
# def like():
#     token = request.values.get('token')
#     deco = jwt.decode(token, token_key, algorithms='HS256')
#     id = deco['id']
#     review_id = request.values.get('review')
#     print("here is :::+++",id,review_id)
#     changelike(id, review_id)
#     return json.dumps(errorMessage(200, "ok"), default=lambda obj: obj.__dict__)
#
# @review_opt.route("/reviewbytime", methods=['GET'])
# def reviewbytime():
#     # token = request.values.get('token')
#     #
#     # deco = jwt.decode(token, token_key, algorithms='HS256')
#     # user_id = deco['id']
#     user_id = request.values.get("id")
#     id = request.values.get("movie_id")
#     print("userid:",user_id)
#     print("movieid:",id)
#     res = getAllReviewsByTime(user_id,id)
#     tumb = getThumbsOfReview(user_id, id)
#     data = {}
#     data['data'] = res
#     data['idlist'] = tumb
#     return data
#
# @review_opt.route("/reviewbyhot", methods=['GET'])
# def reviewbyhot():
#     user_id = request.values.get("id")
#     id = request.values.get("movie_id")
#     print("userid:", user_id)
#     print("movieid:", id)
#     res = getAllReviewsByHot(user_id,id)
#     tumb = getThumbsOfReview(user_id, id)
#
#     data = {}
#     print(tumb)
#     data['data'] = res
#     data['idlist'] = tumb
#     return data