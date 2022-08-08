import jwt

from service.intershipService import click
from service.userService import *
from flask import Blueprint
from flask import request
from service.intershipService import *
from data.models import *
from flask_mail import *
import json
'''
    This file is mainly about internship information
'''
internship_opt = Blueprint('internship_opt', __name__)

token_key = "dreamTeam"

# init homepage method
@internship_opt.route('/home')
def initpage():
    data = init()
    dict = {}
    for i in data:
        dict[repr(i.id)] = i.as_dict()
    data = {}
    data['data'] = dict
    data['errortype'] = 200
    return data

# this api is used for search
@internship_opt.route("/search", methods=['GET'])
def searchInternship():
    key = request.values.get('key')
    field = request.values.get('field')
    location = request.values.get('location')
    type = request.values.get('right')
    city = request.values.get("city")
    state = request.values.get("state")
    res = search_intership(key, field, location, type,city,state)
    dict = {}
    for i in res:
        dict[repr(i.id)] = i.as_dict()
    data = {}
    data['data'] = dict
    data['errortype'] = 200
    return data

# This api is use for vew job
@internship_opt.route("/view", methods=['GET'])
def view():
    id = request.values.get("id")
    job = searchJobById(id)

    return job.as_dict()

# This api is used for recommanding job for users
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

# This api is used for getting current jobs
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

# This api is used for getting hot jobs
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

# This api is used for saving jobs
@internship_opt.route("/save", methods=['GET'])
def add():
    token = request.values.get('token')
    deco = jwt.decode(token, token_key, algorithms='HS256')
    id = deco['id']
    internship_id = request.values.get('internship')
    add_wishlist(id, internship_id)
    return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

# This api is used for unsaving jobs
@internship_opt.route('/unsave', methods=['GET'])
def delete():
    user_id = request.values.get("user_id")
    internship_id = request.values.get("internship_id")
    delete_wishlist(user_id,internship_id)
    return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

# This api is used for getting user wishlist
@internship_opt.route("/getuserwishlist", methods=["GET"])
def getuserwishlist():
    id = request.values.get("id")
    res = get_wish_list(id)
    data = {}
    data['data'] = res
    data['errortype'] = 200
    return data

# This api is used for apply jobs
@internship_opt.route("/apply", methods=["GET"])
def apply():
    id = request.values.get("id")
    channel = apply_internship(id)
    return json.dumps(errorMessage(200, channel),default=lambda obj: obj.__dict__)

# This api is used for getting apply jobs
@internship_opt.route("/getapplylist", methods=["GET"])
def getapplylist():
    id = request.values.get("id")
    res = get_apply_list(id)
    res = [dict(zip(result.keys(), result)) for result in res]
    data = {}
    data['data'] = res
    data['errortype'] = 200
    return data

# This api is used for post new job
@internship_opt.route("/add_internship", methods=['Post'], endpoint='add_internship')
def add_internship():
    data = json.loads(request.data)
    user_id = data['id']
    title = data['title']
    company = data['company']
    field = data['field']
    location = data['location']
    state = data['state']
    city = data['city']
    working_right = data['working_right']
    description = data['description']
    meetings = data['meeting']
    applychannel = data['applychannel']
    internship = Internship(title=title, user_id=user_id, company=company, field=field, location=location, state=state,
                            city=city,applychannel=applychannel,
                            working_right=working_right, description=description,
                            )
    mesvalue = addNewjob(internship)

    id = mesvalue.errormessage
    data = {}
    data['id'] = id
    # add meetings
    for meeting in meetings:
        datetime = meeting['datetime']
        link = meeting['link']
        meeting = Meeting(internship_id=id,
                          datetime=datetime, link=link,
                          deleted=0,
                          )
        addmeeting(meeting)
    message = errorMessage(200, "ok")

    # send notification
    sendNotification(user_id, id)
    return json.dumps(message, default=lambda obj: obj.__dict__)

# This api is used for getting internship detail information
@internship_opt.route("/getinternship",methods=['GET'])
def getinternship():
    id = request.values.get("id")
    click(id)
    data = getInternshipById(id)
    return data

# This api is used for editing internship information
@internship_opt.route("/edit_internship", methods=['Post'], endpoint='edit_internship')
def edit_internship():
    data = json.loads(request.data)
    id = data['id']
    company = data['company']
    user_id = data['user_id']
    title = data['title']
    field = data['field']
    location = data['location']
    state = data['state']
    city = data['city']
    working_right = data['working_right']
    description = data['description']
    meetings = data['meeting']
    applychannel = data['applychannel']
    delete_all(id)
    internship = Internship(id=id, user_id=user_id, company=company, title=title, field=field, location=location,
                            state=state, city=city,applychannel=applychannel,
                            working_right=working_right, description=description,deleted=0
                            )
    message = editjob(internship)
    id = message.errormessage
    # add meetings
    for meeting in meetings:
        time = meeting['datetime']
        link = meeting['link']
        meeting = Meeting(internship_id=id,
                          datetime=time, link=link,
                          deleted=0)
        addmeeting(meeting)

    message = errorMessage(200, "ok")

    return json.dumps(message, default=lambda obj: obj.__dict__)

# This api is used for delete internship
@internship_opt.route("/del_internship", methods=['GET'], endpoint='del_internship')
def del_internship():
    id = request.values.get("id")

    deleteInternshipAndMeeting(id)

    return json.dumps(errorMessage(200, "ok"), default=lambda obj: obj.__dict__)

# This api used for delete meeting
@internship_opt.route("/del_meeting", methods=['Post'], endpoint='del_meeting')
def del_meeting():
    data = json.loads(request.data)
    id = data['id']
    datetime = data['datetime']
    link = data['link']
    meeting = Meeting(intership_id=id,
                      datetime=datetime, link=link,
                      deleted=1,
                      create_time=getTime(datetime),
                      update_time=getTime(datetime)
                      )
    save_meeting = deletemeeting(meeting)
    data['id'] = id
    message = errorMessage(200, data)

    return json.dumps(message, default=lambda obj: obj.__dict__)

# This api is used for getting all internship
@internship_opt.route("/get_all_intern", methods=['Get'], endpoint='get_all_intern')
def get_all_intern():

    id = request.values.get("id")
    internships = getinternsbyuserid(id)
    res = {}
    data = []
    if internships is not None:
        for i in internships:
            data.append(i.as_dict())

    res['errortype'] = 200
    res['data'] = data
    return res

@internship_opt.route("/getnotification", methods=['GET'])
def getnotification():
    token = request.values.get("token")
    deco = jwt.decode(token, token_key, algorithms='HS256')
    id = deco['id']
    res = getAllNotification(id)
    dict = {}
    if res is not None:
        res = [i.as_dict() for i in res]
    else:
        res = []
    dict['data'] = res
    dict['errortype'] = 200
    return dict

@internship_opt.route("/getnotificationnum", methods=['GET'])
def getnotificationNum():
    id = request.values.get("id")
    num = getNotificationNum(id)

    return json.dumps(errorMessage(200, num), default=lambda obj: obj.__dict__)

@internship_opt.route("/readnotification", methods=['GET'])
def readnotification():
    id = request.values.get("id")
    readnotice(id)
    return json.dumps(errorMessage(200, "ok"), default=lambda obj: obj.__dict__)
