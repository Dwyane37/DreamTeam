import pymysql

from interface.userApi import *
from utils.exceptionMessage import *

def checkRegistered(username, mobile, email):
    if User.query(username=username) is not None:
        return errorMessage(1, "This user is already exist")
    elif User.query(email=email) is not None:
        return errorMessage(1, "This email is already registered")
    elif User.query(mobile=mobile) is not None:
        return errorMessage(1, "This mobile is already registered")

    return errorMessage(2, "ok")

def registerNewAccount(inputs):
    try:
        newUser=User(username=inputs["username"],password=inputs["password"],mobile=inputs["mobile"],
                     nickname=inputs['nickname'],sex=inputs['sex'],
                     country = inputs['country'],deleted=inputs['deleted'],
                     create_time=pymysql.Timestamp,update_time=pymysql.Timestamp,
                     tag=inputs['tag'],photo=inputs['photo'],email=inputs['email'],points=1)
        db.session.add(newUser)
        db.session.commit()
    except Exception as e:
        print(e)