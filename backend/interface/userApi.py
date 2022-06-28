from service.userService import *
from flask import Blueprint
from flask import request
from flask_login import LoginManager
from service.userService import *
from data.models import *
import json
user_opt = Blueprint('user_opt', __name__)
login_manager = LoginManager()

login_users = []


@user_opt.route("/register",methods=['POST'], endpoint="register")
def register():
    username = request.form.get('username')
    password = request.form.get('password')
    email = request.form.get('email')
    mobile = request.form.get('mobile')
    message = checkRegistered(username,email,mobile)
    if message.errortype == 1:
        return json.dumps(message,default=lambda obj: obj.__dict__)
    user = User(username=username,password=password,email=email,mobile=mobile)
    registerNewAccount(user)
    message = errorMessage(200, "ok")
    return json.dumps(message,default=lambda obj: obj.__dict__)


@user_opt.route("/login",methods=['GET'], endpoint="login")
def login():
    # data = json.loads(request.form.get('data'))
    username = request.values.get('username')
    password = request.values.get('password')

    message = checkInfoCorrect(username, password)
    if message.errortype == 1:
        return json.dumps(message,default=lambda obj: obj.__dict__)
    if username not in login_users:
        login_users.append(username)

    id = getUserId(username)
    message = errorMessage(200, id)
    return json.dumps(message,default=lambda obj: obj.__dict__)


@user_opt.route("/changepassword",methods=['GET'], endpoint="changepassword")
def changepassword():
    id = request.values.get('id')
    old_password = request.values.get('old_password')
    new_password = request.values.get('new_password')
    # print(id,old_password,new_password)
    message = checkOldPassword(id, old_password)
    if message.errortype == 1:
        return json.dumps(message,default=lambda obj: obj.__dict__)

    message = changepasswd(id, new_password)
    return json.dumps(message,default=lambda obj: obj.__dict__)

@user_opt.route("/forget", methods=['GET'], endpoint="forget")
def forget():
    email = request.values.get("email")
    message = checkEmailIsRegister(email)
    if message.errortype == 1:
        return json.dumps(message,default=lambda obj: obj.__dict__)

    # get random uuid
    captcha = str(uuid.uuid1())[:6]
    body = 'Your verification code is :%s' % captcha
    htmlbody = '<h1>HTML body </h1>'
    message = errorMessage(200, captcha)
    try:
        # send_email('Website email verification code',mail,body,htmlbody)
        msg = Message('Website email verification code',sender='zhousq3758@163.com', recipients=[email])
        msg.body = body
        msg.html = body
        mail.send(msg)
    except Exception as e:
        print(e)
        message = errorMessage(1, e)
    return json.dumps(message,default=lambda obj: obj.__dict__)

@user_opt.route("/resetpassword")
def resetpassword():
    email = request.values.get('email')
    password = request.values.get('password')
    message = reset_password(email, password)
    return json.dumps(message,default=lambda obj: obj.__dict__)

@user_opt.route("/logout")
def logout():
    id = request.values.get('id')
    message = logout_user(id)
    username = message.errormessage
    if username in login_users:
        login_users.remove(username)
        message = errorMessage(200, "ok")
    return json.dumps(message,default=lambda obj: obj.__dict__)
