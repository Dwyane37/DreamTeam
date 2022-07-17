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

def checkInfoCorrect(username, password):
    try:
        if User.query.filter_by(username=username).first() is None:
            return errorMessage(1, "username is not exists")
        user = User.query.filter_by(username=username).first()
        if password != user.password:
            return errorMessage(1, "username or password is incorrect")
        return errorMessage(200, "ok")
    except Exception as e:
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
        return errorMessage(2, "ok")
    except Exception as e:
        print(e)
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


def update_resume(user_id, resume):

    db.session.commit()
    try:
        # 删除原有数据
        ResumeUser.query.filter_by(user_id=user_id).delete()
        ResumeEducation.query.filter_by(user_id=user_id).delete()
        ResumeWorkExperience.query.filter_by(user_id=user_id).delete()
        ResumeProjectExperience.query.filter_by(user_id=user_id).delete()
        ResumeSkill.query.filter_by(user_id=user_id).delete()
        ResumeAward.query.filter_by(user_id=user_id).delete()
        ResumeProjectDisplay.query.filter_by(user_id=user_id).delete()

        # 插入新数据
        for user_info in resume["userInfo"]:
            db.session.add(ResumeUser(
                name=user_info["name"],
                university=user_info["university"],
                email=user_info["email"],
                user_id=user_id
            ))

        for education in resume["education"]:
            db.session.add(ResumeEducation(
                university=education["university"],
                start=education["start"],
                end=education["end"],
                faculty=education["faculty"],
                major=education["major"],
                grades=education["grades"],
                degree=education["degree"],
                user_id=user_id
            ))

        for work in resume["workExperience"]:
            db.session.add(ResumeWorkExperience(
                company=work["company"],
                position=work["position"],
                start=work["start"],
                end=work["end"],
                description=work["description"],
                user_id=user_id
            ))

        for project in resume["projectExperience"]:
            db.session.add(ResumeProjectExperience(
                name=project["name"],
                start=project["start"],
                end=project["end"],
                description=project["description"],
                user_id=user_id
            ))

        for skill in resume["skills"]:
            db.session.add(ResumeSkill(
                skill=skill["skill"],
                user_id=user_id
            ))

        for award in resume["awards"]:
            db.session.add(ResumeAward(
                title=award["title"],
                description=award["description"],
                user_id=user_id
            ))

        for project in resume["projectDisplay"]:
            db.session.add(ResumeProjectDisplay(
                name=project["name"],
                link=project["link"],
                user_id=user_id
            ))
        db.session.commit()
        return {"code": 0, "message": "ok"}
    except Exception as e:
        return {"code": 1, "message": str(e)}


def query_resume(user_id):
    try:
        user = User.query.filter_by(id=user_id).first()
        body = {
            "userInfo": [x.to_dict() for x in user.users],
            "education": [x.to_dict() for x in user.educations],
            "workExperience": [x.to_dict() for x in user.works],
            "projectExperience": [x.to_dict() for x in user.projects],
            "skills": [x.to_dict() for x in user.skills],
            "awards": [x.to_dict() for x in user.awards],
            "projectDisplay": [x.to_dict() for x in user.displays]
        }
        return body
    except Exception as e:
        return {"code": 1, "message": str(e)}


# 关注
def user_like(following_id, follower_id):
    count = Follow.query.filter_by(following_id=following_id, follower_id=follower_id).count()
    if count == 0:
        db.session.add(Follow(following_id=following_id, follower_id=follower_id))
        db.session.commit()

    return {"code": 0, "message": "ok"}


# 取消关注
def user_dislike(following_id, follower_id):
    count = Follow.query.filter_by(following_id=following_id, follower_id=follower_id).count()
    if count != 0:
        Follow.query.filter_by(following_id=following_id, follower_id=follower_id).delete()
        db.session.commit()

    return {"code": 0, "message": "ok"}


# 查询关注列表
def query_following(user_id):
    print(user_id)
    data = [follow.following_id for follow in Follow.query.filter_by(follower_id=user_id).all()]
    return {"code": 0, "message": "ok", "data": data}


# 查询粉丝列表
def query_follower(user_id):
    print(user_id)
    data = [follow.follower_id for follow in Follow.query.filter_by(following_id=user_id).all()]
    return {"code": 0, "message": "ok", "data": data}