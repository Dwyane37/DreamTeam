import pymysql
import datetime
from interface.userApi import *
from utils.exceptionMessage import *
from utils.generator import *
from data.models import *

def checkRegistered(username, email):
    if User.query.filter_by(username=username).first() is not None:
        return errorMessage(1, "This user is already exist")
    elif User.query.filter_by(email=email).first() is not None:
        return errorMessage(1, "This email is already registered")

    return errorMessage(2, "ok")

def registerNewAccount(inputs):
    try:
        # newUser=User(username=inputs["username"],password=inputs["password"],mobile=inputs["mobile"],
        #              nickname=inputs['nickname'],sex=inputs['sex'],
        #              country = inputs['country'],deleted=inputs['deleted'],
        #              create_time=pymysql.Timestamp,update_time=pymysql.Timestamp,
        # print('username:',inputs.username,"password:",inputs.password)
        id = getuuid()
        newUser = User(id=id, username=inputs.username, password=inputs.password, deleted=0,
                       email=inputs.email,
                       create_time=getTime(datetime),
                       update_time=getTime(datetime),
                       type=inputs.type)
        db.session.add(newUser)
        db.session.commit()
        return errorMessage(200, id)
    except Exception as e:
        return errorMessage(1, e)

def getLoginusertype(id):
    try:
        user = User.query.get(id)
        return user.type

    except Exception as e:
        print(e)

def checkInfoCorrect(username, password):
    try:
        if User.query.filter_by(username=username).first() is None:
            return errorMessage(1, "username is not exists")
        user = User.query.filter_by(username=username).first()
        if password != user.password:
            return errorMessage(1, "username or password is incorrect")
        return errorMessage(200, "ok")
    except Exception as e:
        print(e)
        return errorMessage(1, e)

def getUserId(username):
    user = User.query.filter_by(username=username).first()
    id = user.id
    return id

def checkOldPassword(id, old_password):
    try:
        user = User.query.get(id)
        if user.password != old_password:
            return errorMessage(1, "password is incorrect")
        return errorMessage(200, "ok")
    except Exception as e:
        return errorMessage(1, e)

def changepasswd(id, new_password):
    try:
        user = User.query.get(id)
        user.password = new_password
        db.session.commit()
        return errorMessage(200, "ok")

    except Exception as e:
        return errorMessage(1, e)

def checkEmailIsRegister(email):
    try:
        user = User.query.filter_by(email=email).first()

        if user is None:
            return errorMessage(1, "This email is not registered")
        return errorMessage(2, "ok")

    except Exception as e:
        return errorMessage(1, e)

def reset_password(email,password):
    try:
        user = User.query.filter_by(email=email).first()
        user.password = password
        db.session.commit()
        return errorMessage(200, "ok")
    except Exception as e:
        return errorMessage(1, e)

def logout_user(id):
    try:
        user = User.query.get(id)
        return errorMessage(2, user.username)

    except Exception as e:
        return errorMessage(1, e)

def getuserfromid(id):
    try:
        user = User.query.get(id)
        return errorMessage(200, user)
    except Exception as e:
        return errorMessage(1, e)

def changedetail(id,mobile,nickname,sex,country,update_time,description,tag,
                 photo,email):
    try:
        user = User.query.get(id)
        user.mobile = mobile
        user.nickname = nickname
        user.sex = sex
        user.country = country
        user.update_time = update_time
        user.description = description
        user.tag = tag
        user.photo = photo
        user.email = email
        db.session.commit()
        return errorMessage(200, "ok")
    except Exception as e:
        return errorMessage(1,e)

def get_info(id):
    try:
        user = User.query.get(id)
        res = {}
        res['username'] = user.username
        res['email'] = user.email
        res['mobile'] = user.mobile
        res['type'] = user.type
        return res
    except Exception as e:
        return errorMessage(1, e)
