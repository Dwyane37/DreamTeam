import datetime
from interface.intershipApi import *
from utils.exceptionMessage import *
from utils.generator import *
from sqlalchemy import desc
from data.models import *
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

DB_CONFIG = { #---根据在你电脑上的schema名字改
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "passwd": "zswjq997131",
    # "db": "Sleep_project1",
    "db": "intern",
    "charset": "utf8"
}
def init():
    res = Internship.query.filter_by(deleted=0).order_by(desc("update_time")).all()
    for e in res:
        print(e)
    return res


def search_intership(key, field, location, type, city, state):
    # if type == 'international':
    #     type = 0
    # elif type == 'pr':
    #     type = 1
    print(key, field,location,type,city,state)
    if field == "" and location == "" and type == "":
        print("1")
        res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key))).all()
    elif field == "" and location == "" and type != "":
        print("2")
        res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                      Internship.working_right.like('%{type}'.format(type=type))).all()

    elif field == "" and location != "" and type == "":
        print("3")
        if state != "" and city != "":
            print("4")
            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.state == state,
                                          Internship.city == city).all()
        elif state != "" and city == "":
            print("5")
            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.state == state).all()
        else:
            print("6")
            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location).all()

    elif field != "" and location == "" and type == "":
        print("7")
        res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                      Internship.field == field).all()
    elif field != "" and location != "" and type == "":
        if state != "" and city != "":
            print("8")
            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.field == field,
                                          Internship.state == state,
                                          Internship.city == city).all()
        elif state != "" and city == "":
            print("9")
            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.field == field,
                                          Internship.state == state).all()
        else:
            print("10")
            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.field == field,
                                          Internship.location == location).all()

    elif field != "" and location == "" and type != "":
        print("11")
        res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                      Internship.field == field,
                                      Internship.working_right.like('%{type}'.format(type=type))).all()
    elif field == "" and location != "" and type != "":
        if state != "" and city != "":
            print("12")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.working_right.like('%{type}%'.format(type=type)),
                                          Internship.state == state,
                                          Internship.city == city).all()
        elif state != "" and city == "":
            print("13")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.working_right.like('%{type}%'.format(type=type)),
                                          Internship.state == state).all()
        else:
            print("14")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.working_right.like('%{type}%'.format(type=type)),
                                          Internship.location == location).all()

    else:
        if state != "" and city != "":
            print(state,city)
            print("15")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.working_right.like('%{type}%'.format(type=type)),
                                          Internship.state == state,
                                          Internship.field == field,
                                          Internship.city == city).all()
        elif state != "" and city == "":
            print("16")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.working_right.like('%{type}%'.format(type=type)),
                                          Internship.field == field,
                                          Internship.state == state).all()
        else:
            print("17")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.working_right.like('%{type}%'.format(type=type)),
                                          Internship.field == field,
                                          Internship.location == location).all()

    return res

def click(id):
    try:
        intern = Internship.query.get(id)
        intern.view = intern.view + 1
        db.session.commit()

    except Exception as e:
        print(e)

def searchJobById(id):
    try:
        click(id)
        internship = Internship.query.filter_by(id=id, deleted=0).first()
        internship.deleted = 0
        db.session.commit()
        return internship
    except Exception as e:
        print(e)

def searchResume(id):
    try:
        resume = ResumeUser.query.filter_by(user_id=id).first()
        return resume
    except Exception as e:
        print(e)

def getRecommJobs(id):
    resumeedu = ResumeEducation.query.filter_by(user_id=id).first()
    print("############",resumeedu.id)
    position = ResumeWorkExperience.query.filter_by(user_id=id).first()
    resume = ResumeUser.query.filter_by(user_id=id).first()
    if resumeedu is None or position is None or resume is None:
        print("herer-----------------")
        return []
    field = resumeedu.major
    print(field)
    aim = position.position
    intro = resume.introduction
    res = Internship.query.all()
    list = []
    for e in res:
        temp = e.title + " " + e.location + " " + e.field
        if e.state != "":
            temp = temp + " " + e.state
            if e.city != "":
                temp = temp + " " + e.city
        list.append(temp.lower())
    print(list)
    if field is not None:
        descrip = field + " "
    if aim is not None:
        descrip = descrip + aim + " "
    if intro is not None:
        descrip = descrip + intro
    descrip = descrip.lower()
    print(descrip)
    recomm_index = get_recomm(descrip,list,10)
    return_lst = [res[i-1] for i in recomm_index]
    print(return_lst)
    return return_lst

def get_recomm(descrip,soup,num):
    temp=[descrip]+soup
    tfidf = TfidfVectorizer(stop_words='english',lowercase=True)
    tfidf_matrix = tfidf.fit_transform(temp)
    cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    ct=0
    ans=[[i,cosine_sim[0][i]] for i in range(1,len(cosine_sim[0])) if cosine_sim[0][i]>0]
    ans=sorted(ans, key=lambda x:x[1],reverse=True )
#     ans=ans.sort()
    if num<len(ans):
        return [ans[i][0] for i in range(1,num)]
    else:
        return [ans[i][0] for i in range(1,len(ans))]

def getCurrentJobs():
    try:
        res = Internship.query.order_by(desc(Internship.update_time)).all()
        res = res[:5]
        return res

    except Exception as e:
        print(e)

def getHotJobs():
    try:
        res = Internship.query.order_by(Internship.view)
        res = res[:5]
        return res

    except Exception as e:
        print(e)

def get_wish_list(id):
    # Movie.query.join(Wishlist).filter()
    conn = pymysql.connect(
        host=DB_CONFIG["host"],
        port=DB_CONFIG["port"],
        user=DB_CONFIG["user"],
        passwd=DB_CONFIG["passwd"],
        db=DB_CONFIG["db"],
        charset=DB_CONFIG["charset"]
    )
    cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
    sql = "SELECT db_internships.id, db_internships.title, db_internships.user_id,db_collection.id,db_resume_user_info.thumbnail from db_collection LEFT JOIN db_internships on db_internships.id = db_collection.internship_id " \
          "LEFT JOIN db_resume_user_info on db_internships.user_id = db_resume_user_info.user_id " \
          "where db_collection.user_id = {} and db_collection.deleted = 0;".format(id)
    # res = db.session.query(Internship.id,Internship.title, Internship.user_id,
    #                        Collection.id).outerjoin(Collection, Collection.internship_id == Internship.id).filter(
    #     Collection.user_id == id,Collection.deleted==0).all()
    # return res
    cursor.execute(sql)  # ASC
    result = cursor.fetchall()
    conn.close()
    return result

def delete_wishlist(user_id,internship_id):
    try:
        wishlist = Collection.query.filter_by(user_id=user_id,internship_id=internship_id).first()
        wishlist.deleted = 1
        db.session.commit()
    except Exception as e:
        print(e)

def add_wishlist(id, internship_id):
    try:
        wish = Collection.query.filter_by(user_id=id, internship_id=internship_id).first()
        if wish is None:
            wish = Collection(id=getuuid(),
                     user_id=id,
                     internship_id=internship_id,
                     deleted=0)
            db.session.add(wish)
            db.session.commit()
        elif wish.deleted == 0:
            wish.deleted = 1
            db.session.commit()
        elif wish.deleted == 1:
            wish.deleted = 0
            db.session.commit()
    except Exception as e:
        print(e)


def checkIfApplied(id,internship_id):
    try:
        apply = Apply.query.filter_by(user_id=id,internship_id=internship_id,deleted=0)
        if apply is None:
            return errorMessage(1, "You have already applied this position")

        return errorMessage(200,"ok")
    except Exception as e:
        print(e)

def apply_internship(id, internship_id):
    try:
        apply = Apply(id=getuuid(),
                      user_id=id,
                      internship_id=internship_id,
                      create_time=getTime(datetime),
                      update_time=getTime(datetime),
                      deleted=0)
        db.session.add(apply)
        db.session.commit()

    except Exception as e:
        print(e)

def get_apply_list(id):
    try:
        res = db.session.query(Internship.title, Internship.user_id, Apply.update_time,
                               Apply.id).outerjoin(Apply, Apply.user_id == Internship.user_id).filter(
            Apply.user_id == id, Internship.deleted == 0).all()
        return res

    except Exception as e:
        print(e)

# He
def addNewjob(inputs):
    try:
        id = getuuid()
        newJob = Internship(id=id, user_id=inputs.user_id, company=inputs.company, title=inputs.title, field=inputs.field, location=inputs.location,
                            state=inputs.state, city=inputs.city,
                            deleted=0, working_right=inputs.working_right, description=inputs.description,
                            create_time=getTime(datetime),
                            update_time=getTime(datetime),
                            )
        db.session.add(newJob)
        db.session.commit()
        return errorMessage(200, id)
    except Exception as e:
        return errorMessage(1, e)

def deletejob(inputs):
    try:
        Job = Internship(id=inputs.id, user_id=inputs.user_id, company=inputs.company, title=inputs.title, field=inputs.field, location=inputs.location,
                            state=inputs.state, city=inputs.city,
                            deleted=1, working_right=inputs.working_right, description=inputs.description,
                            create_time=getTime(datetime),
                            update_time=getTime(datetime),
                            )
        # delete old job
        Internship.query.filter_by(id=inputs.id).delete()
        # add new job (deleted=1)
        db.session.add(Job)
        db.session.commit()
        return errorMessage(200, id)
    except Exception as e:
        return errorMessage(1, e)

def editjob(inputs):
    try:
        Job = Internship(id=inputs.id, user_id=inputs.user_id, company=inputs.company, title=inputs.title, field=inputs.field, location=inputs.location,
                            state=inputs.state, city=inputs.city,
                            deleted=0, working_right=inputs.working_right, description=inputs.description,
                            create_time=getTime(datetime),
                            update_time=getTime(datetime),
                            )
        # delete old job
        Internship.query.filter_by(id=inputs.id).delete()
        # add new job
        db.session.add(Job)
        db.session.commit()
        return errorMessage(200, id)
    except Exception as e:
        return errorMessage(1, e)


def addmeeting(inputs):
    try:
        id = getuuid()
        meeting = Meeting(id=id, intership_id=inputs.intership_id,
                           datetime=inputs.datetime, link=inputs.link,
                           deleted=0,
                           create_time=getTime(datetime),
                           update_time=getTime(datetime),
                           )
        db.session.add(meeting)
        db.session.commit()
        return errorMessage(200, id)
    except Exception as e:
        return errorMessage(1, e)


def deletemeeting(inputs):
    try:
        meeting = Meeting(id=inputs.id, intership_id=inputs.intership_id,
                            datetime=inputs.datetime, link=inputs.link,
                            deleted=1,
                            create_time=getTime(datetime),
                            update_time=getTime(datetime),
                            )
        # delete old info
        Meeting.query.filter_by(id=inputs.id).delete()
        # add new info
        db.session.add(meeting)
        db.session.commit()
        return errorMessage(200, id)
    except Exception as e:
        return errorMessage(1, e)


def editmeeting(inputs):
    try:
        meeting = Meeting(id=inputs.id, intership_id=inputs.intership_id,
                            datetime=inputs.datetime, link=inputs.link,
                            deleted=0,
                            create_time=getTime(datetime),
                            update_time=getTime(datetime),
                            )
        # delete old info
        Meeting.query.filter_by(id=inputs.id).delete()
        # add new info
        db.session.add(meeting)
        db.session.commit()
        return errorMessage(200, id)
    except Exception as e:
        return errorMessage(1, e)

def getmeetingsbyjobid(id):
    try:
        meetings = Meeting.query.filter_by(internship_id=id, deleted=0).all()
        return meetings
    except Exception as e:
        return errorMessage(1, e)

def getmeeting(id):
    try:
        meeting = Meeting.query.filter_by(id=id, deleted=0).first
        return meeting
    except Exception as e:
        return errorMessage(1, e)

def getinternsbyuserid(user_id):
    try:
        internships = Internship.query.filter_by(user_id=user_id, deleted=0).all()
        return internships
    except Exception as e:
        return errorMessage(1, e)

def getInternshipById(id):
    try:
        internship = db.session.query(Internship.id,Internship.title,
        Internship.content,Internship.type,Internship.create_time,
        Internship.update_time,Internship.deleted,Internship.view,
        Internship.location,Internship.field,Internship.state,
        Internship.city,Internship.description,Internship.working_right,
        Internship.applychannel,Internship.company,ResumeUser.user_id,ResumeUser.thumbnail,ResumeUser.name).outerjoin(
            ResumeUser,ResumeUser.user_id==Internship.user_id
        ).filter(Internship.id==id)
        res = [dict(zip(result.keys(), result)) for result in internship]
        meetings = Meeting.query.filter_by(internship_id=id).all()
        print(res)
        print(meetings)
        meetings = [x.as_dict() for x in meetings]
        data = {}
        data['internship'] = res
        data['meetings'] = meetings
        data['errortype'] = 200
        return data
    except Exception as e:
        print(e)

def deleteInternshipAndMeeting(id):
    try:
        internship = Internship.query.get(id)
        internship.deleted = 1
        db.session.commit()
        meetings = Meeting.query.filter_by(internship_id=id).all()
        for meet in meetings:
            meet.deleted = 1
            db.session.commit()

    except Exception as e:
        print(e)
