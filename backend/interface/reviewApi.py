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

# This function is used for make a comment for a internship
@review_opt.route("/review",methods=['GET', 'POST'] )
def review():
    data = json.loads(request.data)
    token = data['token']
    deco = jwt.decode(token, token_key, algorithms='HS256')
    id = deco['id']
    review = data['review']
    internship_id = data['internship']
    parent_id = data['parent_id']
    review_internship(id,review,internship_id,parent_id)

    return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

@review_opt.route("/deletereview", methods=['GET'])
def deletereview():
    id = request.values.get("id")
    delete_review(id)
    return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

# This function is used for person review
@review_opt.route("/personreview", methods=['GET'])
def personreview():
    id = request.values.get('id')
    res = getAllReviewsById(id)
    if res is not None:
        res = [dict(zip(result.keys(), result)) for result in res]
    else:
        res = []
    data = {}
    data['data'] = res
    data['errortype'] = 200
    return data

@review_opt.route("/internshipreview", methods=['GET'])
def internshipreview():
    id = request.values.get("movie_id")
    res = getInternReviewById(id)
    data = {}
    if res is not None:
        res = [dict(zip(result.keys(), result)) for result in res]
    else:
        res = []
    data['data'] = res
    data['errortype'] = 200
    return data
