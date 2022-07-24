import jwt

from service.userService import *
from flask import Blueprint
from flask import request, jsonify
from flask_login import LoginManager
from service.userService import *
from data.models import *
from utils.email import *
import time
# from flask_mail import *
import json

# from utils.email import *

user_opt = Blueprint('user_opt', __name__)
login_manager = LoginManager()

login_users = []
token_key = "dreamTeam"

@user_opt.route("/register",methods=['POST'], endpoint="register")
def register():
    data = json.loads(request.data)
    username = data['username']
    password = data['password']
    email = data['email']
    type = data['type']
    if type == 'student':
        type = 0
    else:
        type = 1
    message = checkRegistered(username, email)
    if message.errortype == 1:
        return json.dumps(message, default=lambda obj: obj.__dict__)
    user = User(username=username, password=password, email=email,type=type)
    mesvalue = registerNewAccount(user)
    start_date = time.time() + 3600
    id = mesvalue.errormessage
    mes = {'id': id, 'exp': start_date}
    token = jwt.encode(mes, token_key, algorithm='HS256')
    data = {}
    data['id'] = id
    data['token'] = token
    message = errorMessage(200, data)
    deco = jwt.decode(token,
                      token_key, algorithms='HS256', options={"varify_signature": False})
    exptime = deco['exp']
    return json.dumps(message, default=lambda obj: obj.__dict__)


@user_opt.route("/login",methods=['GET'], endpoint="login")
def login():
    # data = json.loads(request.form.get('data'))
    username = request.values.get('username')
    password = request.values.get('password')

    message = checkInfoCorrect(username, password)
    if message.errortype == 1:
        return json.dumps(message, default=lambda obj: obj.__dict__)
    if username not in login_users:
        login_users.append(username)

    id = getUserId(username)
    start_date = time.time() + 3600
    mes = {'id': id, 'exp': start_date}
    token = jwt.encode(mes, token_key, algorithm='HS256')
    data = {}
    data['id'] = id
    data['token'] = token
    type = getLoginusertype(id)
    data['type'] = type
    message = errorMessage(200, data)
    deco = jwt.decode(token,
                      token_key, algorithms='HS256', options={"varify_signature": False})
    exptime = deco['exp']
    # exp_time = datetime.datetime.strptime(str(exptime), "%Y-%m-%d %H:%M:%S.%f")
    return json.dumps(message, default=lambda obj: obj.__dict__)


@user_opt.route("/changepassword",methods=['GET'], endpoint="changepassword")
def changepassword():
    token = request.values.get('token')
    old_password = request.values.get('old_password')
    new_password = request.values.get('new_password')
    # print(id,old_password,new_password)
    deco = jwt.decode(token, token_key, algorithms='HS256')
    id = deco['id']
    message = checkOldPassword(id, old_password)
    if message.errortype == 1:
        return json.dumps(message, default=lambda obj: obj.__dict__)

    message = changepasswd(id, new_password)
    start_date = time.time() + 3600
    mes = {'id': id, 'exp': start_date}
    token = jwt.encode(mes, token_key, algorithm='HS256')
    data = {}
    data['id'] = id
    data['token'] = token
    message = errorMessage(200, data)
    # deco = jwt.decode(token,
    #                   token_key, algorithms='HS256', options={"varify_signature": False})
    exptime = deco['exp']
    return json.dumps(message, default=lambda obj: obj.__dict__)


@user_opt.route("/forget", methods=['GET'], endpoint="forget")
def forget():
    email = request.values.get("email")
    message = checkEmailIsRegister(email)
    if message.errortype == 1:
        return json.dumps(message, default=lambda obj: obj.__dict__)

    # get random uuid
    captcha = str(uuid.uuid1())[:6]
    body = 'Your verification code is :%s' % captcha
    htmlbody = '<h1>HTML body </h1>'
    message = errorMessage(200, captcha)
    try:
        # send_email('Website email verification code',mail,body,htmlbody)
        msg = Message('Website email verification code', sender='1184344283@qq.com', recipients=[email])

        msg.body = body
        msg.html = body
        mail.send(msg)

    except Exception as e:
        message = errorMessage(1, e)
    return json.dumps(message, default=lambda obj: obj.__dict__)

@user_opt.route("/resetpassword")
def resetpassword():
    email = request.values.get('email')
    password = request.values.get('password')
    message = reset_password(email, password)
    return json.dumps(message, default=lambda obj: obj.__dict__)


@user_opt.route("/logout")
def logout():
    token = request.values.get('token')
    deco_token = jwt.decode(token, token_key, algorithms='HS256')
    id = deco_token['id']
    # id = request.values.get('id')
    message = logout_user(id)
    username = message.errormessage
    if username in login_users:
        login_users.remove(username)
    message = errorMessage(200, "ok")
    return json.dumps(message, default=lambda obj: obj.__dict__)

@user_opt.route("/getinfo", methods=['GET'])
def getinfo():
    token = request.values.get('token')
    deco_token = jwt.decode(token, token_key, algorithms='HS256')
    id = deco_token['id']
    res = get_info(id)
    data = {}
    data['data'] = res
    data['errortype'] = 200
    return data

@user_opt.route("/submitResume", methods=['POST'])
def change_resume():
    resumeid = request.json["resumeid"]
    resume = request.json["resume"]
    message = update_resume(resumeid, resume)
    # keys = [
    #     "access_token", "name", "sex", "mobile", "age", "address",
    #     "email", "aim", "honor", "education", "experience", "skills"
    # ]
    # # 验证输入参数
    # miss_keys = [key for key in keys if key not in request.json.keys()]
    # if miss_keys:
    #     return jsonify(code=1, message="miss keys: " + ", ".join(miss_keys))
    # token = request.json["access_token"]
    # deco = jwt.decode(token,
    #                   token_key,
    #                   algorithms='HS256', options={"varify_signature": False})
    #
    # if time.time() > deco["exp"]:
    #     return jsonify(code=1, message="Token has expired")
    #
    # user_id = deco["id"]
    # message = change_resume(user_id=user_id, name=request.json["name"], sex=request.json["sex"],
    #                 mobile=request.json["mobile"], age=request.json["age"], address=request.json["address"],
    #                 email=request.json["email"], aim=request.json["aim"], honor=request.json["honor"],
    #                 education=request.json["education"], experience=request.json["experience"],
    #                 skills=request.json["skills"])
    return jsonify(message)


@user_opt.route("/getResume", methods=['GET'])
def get_resume():
    user_id = request.values.get('resumeId')

    message = query_resume(user_id)
    return jsonify(message)


# 关注
@user_opt.route("/like", methods=['GET'])
def like():
    following_id = request.values.get('followingId')
    follower_id = request.values.get('followerId')
    message = user_like(following_id, follower_id)
    return jsonify(message)


# 取关
@user_opt.route("/dislike", methods=['GET'])
def dislike():
    following_id = request.values.get('followingId')
    follower_id = request.values.get('followerId')
    message = user_dislike(following_id, follower_id)
    return jsonify(message)


# 关注列表
@user_opt.route("/following", methods=['GET'])
def following():
    user_id = request.values.get('userId')
    message = query_following(user_id)
    return jsonify(message)


# 粉丝列表
@user_opt.route("/follower", methods=['GET'])
def follower():
    user_id = request.values.get('userId')
    message = query_follower(user_id)
    return jsonify(message)

