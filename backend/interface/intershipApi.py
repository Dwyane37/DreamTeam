import jwt

from service.userService import *
from flask import Blueprint
from flask import request
from service.intershipService import *
from data.models import *
from flask_mail import *
import json

internship_opt = Blueprint('internship_opt', __name__)

token_key = "dreamTeam"

@internship_opt.route('/home')
def initpage():
    data = init()
    dict = {}
    for i in data:
        dict[repr(i.id)] = i.as_dict()
    # message = Message(200,"ok", dict)
    data = {}
    data['data'] = dict
    data['errortype'] = 200
    return data

@internship_opt.route("/search", methods=['GET'])
def searchInternship():
    key = request.values.get('key')
    field = request.values.get('field')
    location = request.values.get('location')
    type = request.values.get('right')
    city = request.values.get("city")
    state = request.values.get("state")
    print(key, field, location, type, city, state)
    res = search_intership(key, field, location, type,city,state)
    print("res:",res)
    dict = {}
    for i in res:
        dict[repr(i.id)] = i.as_dict()
    data = {}
    data['data'] = dict
    data['errortype'] = 200
    return data

@internship_opt.route("/view", methods=['GET'])
def view():
    id = request.values.get("id")
    job = searchJobById(id)

    return job.as_dict()

@internship_opt.route("/recommand", methods=['GET'])
def recommand():
    token = request.values.get('token')
    deco_token = jwt.decode(token, token_key, algorithms='HS256')
    id = deco_token['id']
    recomm_lst = getRecommJobs(id)
    dict = {}
    for i in recomm_lst:
        dict[repr(i.id)] = i.as_dict()
    data = {}
    data['data'] = dict
    data['errortype'] = 200
    return data

@internship_opt.route("/getcurrentjobs", methods=['GET'])
def getcurrentjobs():
    res = getCurrentJobs()
    dict = {}
    for i in res:
        dict[repr(i.id)] = i.as_dict()
    data = {}
    data['data'] = dict
    data['errortype'] = 200
    return data

@internship_opt.route("/gethotjobs", methods=['GET'])
def gethotjobs():
    res = getHotJobs()
    dict = {}
    for i in res:
        dict[repr(i.id)] = i.as_dict()
    data = {}
    data['data'] = dict
    data['errortype'] = 200
    return data

@internship_opt.route('wishlist', methods=['GET'])
def getwishlist():
    token = request.values.get('token')
    deco = jwt.decode(token, token_key, algorithms='HS256')
    id = deco['id']
    res = get_wish_list(id)
    dict = {}
    for i in res:
        dict[repr(i.id)] = i.as_dict()
    data = {}
    data['data'] = dict
    data['errortype'] = 200
    return data

@internship_opt.route("/add", methods=['GET'])
def add():
    token = request.values.get('token')
    deco = jwt.decode(token, token_key, algorithms='HS256')
    id = deco['id']
    internship_id = request.values.get('internship')
    add_wishlist(id, internship_id)
    return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

@internship_opt.route('/delete', methods=['GET'])
def delete():
    id = request.values.get("wishlist_id")
    delete_wishlist(id)
    return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

@internship_opt.route("/getuserwishlist", methods=["GET"])
def getuserwishlist():
    id = request.values.get("id")
    res = get_wish_list(id)
    # dict = {}
    # dict['data'] = res
    print(res)
    # res = [dict(zip(r.keys(),r)) for r in res]
    res = [dict(zip(result.keys(), result)) for result in res]
    for i in res:
        print(i)
    data = {}
    data['data'] = res
    data['errortype'] = 200
    return data

@internship_opt.route("/apply", methods=["GET"])
def apply():
    id = request.values.get("id")
    internship_id = request.values.get("internship_id")
    message = checkIfApplied(id,internship_id)
    if message.errortype == 1:
        return json.dumps(message, default=lambda obj: obj.__dict__)
    apply_internship(id, internship_id)

    return json.dumps(errorMessage(200, "ok"),default=lambda obj: obj.__dict__)


@internship_opt.route("/getapplylist", methods=["GET"])
def getapplylist():
    id = request.values.get("id")
    res = get_apply_list(id)
    # dict = {}
    # dict['data'] = res
    res = [dict(zip(result.keys(), result)) for result in res]
    for i in res:
        print(i)
    data = {}
    data['data'] = res
    data['errortype'] = 200
    return data
