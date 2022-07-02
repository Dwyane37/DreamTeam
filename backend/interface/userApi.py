import jwt

from service.userService import *
from flask import Blueprint
from flask import request
from flask_login import LoginManager
from service.userService import *
from data.models import *
from flask_mail import *
import json

from utils.email import *

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
    print(username, password, email)
    # gender = data['params']['gender']
    # if gender == 'male':
    #     gender = 1
    # else:
    #     gender = 0
    # print(username,password,email)
    message = checkRegistered(username, email)
    if message.errortype == 1:
        return json.dumps(message, default=lambda obj: obj.__dict__)
    user = User(username=username, password=password, email=email)
    mesvalue = registerNewAccount(user)
    start_date = time.time() + 3600
    id = mesvalue.errormessage
    mes = {'id': id, 'exp': start_date}
    token = jwt.encode(mes, token_key, algorithm='HS256')
    message = errorMessage(200, token)
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
    message = errorMessage(200, token)
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
    message = errorMessage(200, token)
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
    id = request.values.get('id')
    message = logout_user(id)
    username = message.errormessage
    if username in login_users:
        login_users.remove(username)
        message = errorMessage(200, "ok")
    return json.dumps(message, default=lambda obj: obj.__dict__)
