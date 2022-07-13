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
    return dict

@internship_opt.route("/search", methods=['GET'])
def searchInternship():
    key = request.values.get('keyword')
    field = request.values.get('field')
    location = request.values.get('location')
    type = request.values.get('right')
    city = request.values.get("city")
    state = request.values.get("state")
    res = search_intership(key, field, location, type,city,state)
    dict = {}
    for i in res:
        dict[repr(i.id)] = i.as_dict()
    return dict

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
    resume = searchResume(id)
    recomm_lst = getRecommJobs(resume)
    dict = {}
    for i in recomm_lst:
        dict[repr(i.id)] = i.as_dict()
    return dict

@internship_opt.route("/getcurrentjobs", methods=['GET'])
def getcurrentjobs():
    res = getCurrentJobs()
    diec = {}
    diec['data'] = res
    return  diec

@internship_opt.route("/gethotjobs", methods=['GET'])
def gethotjobs():
    res = getHotJobs()
    diec = {}
    diec['data'] = res
    return diec