from service.userService import *
from flask import Blueprint
from flask import request
from flask_login import LoginManager
from service.userService import *
from data.models import *
import json
user_opt = Blueprint('user_opt', __name__)
login_manager = LoginManager()
@user_opt.route("/register", endpoint="register")
def register():
    user = json.loads(request.form.get('data'))
    username = user['username']
    email = user['email']
    mobile = user['mobile']
    errorMessage = checkRegistered(username,email,mobile)
    if errorMessage.errortype == 1:
        return errorMessage

    registerNewAccount(user)