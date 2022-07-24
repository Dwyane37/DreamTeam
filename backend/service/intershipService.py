import datetime
from interface.intershipApi import *
from utils.exceptionMessage import *
from utils.generator import *
from sqlalchemy import desc
from data.models import *
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

def init():
    res = Internship.query.filter_by(deleted=0).order_by(desc("update_time")).all()
    for e in res:
        print(e)
    return res


def search_intership(key, field, location, type, city, state):
    if type == 'international':
        type = 0
    elif type == 'pr':
        type = 1
    print(key, field,location,type,city,state)
    if field == "" and location == "" and type == "":
        print("1")
        res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key))).all()
    elif field == "" and location == "" and type != "":
        print("2")
        res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                      Internship.type == type).all()
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
                                      Internship.type == type).all()
    elif field == "" and location != "" and type != "":
        if state != "" and city != "":
            print("12")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.type.like('%{type}%'.format(type=type)),
                                          Internship.state == state,
                                          Internship.city == city).all()
        elif state != "" and city == "":
            print("13")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.type.like('%{type}%'.format(type=type)),
                                          Internship.state == state).all()
        else:
            print("14")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.type.like('%{type}%'.format(type=type)),
                                          Internship.location == location).all()

    else:
        if state != "" and city != "":
            print(state,city)
            print("15")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.type.like('%{type}%'.format(type=type)),
                                          Internship.state == state,
                                          Internship.field == field,
                                          Internship.city == city).all()
        elif state != "" and city == "":
            print("16")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.type.like('%{type}%'.format(type=type)),
                                          Internship.field == field,
                                          Internship.state == state).all()
        else:
            print("17")

            res = db.session.query(Internship).filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.type.like('%{type}%'.format(type=type)),
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
        return internship
    except Exception as e:
        print(e)

def searchResume(id):
    try:
        resume = Resume.query.filter_by(user_id=id).first()
        return resume
    except Exception as e:
        print(e)

def getRecommJobs(resume):
    resumeedu = ResumeEducation.query.filter_by(user_id=id).first()
    position = ResumeWorkExperience.query.filter_by(user_id=id).first()
    resume = ResumeUser.query.filter_by(user_id=id).first()
    if resumeedu is None or position is None or resume is None:
        return []
    field = resumeedu.major
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
    descrip = field + " " + aim + " " + intro + " "
    descrip = descrip.lower()
    recomm_index = get_recomm(descrip,list,5)
    return_lst = [res[i-1] for i in recomm_index]
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
        res = res[:10]
        return res

    except Exception as e:
        print(e)

def getHotJobs():
    try:
        res = Internship.query.order_by(Internship.view)
        res = res[:10]
        return res

    except Exception as e:
        print(e)

def get_wish_list(id):
    # Movie.query.join(Wishlist).filter()
    res = db.session.query(Internship.title, Collection.internship_id, Internship.user_id,
                           Collection.id).outerjoin(Collection, Collection.internship_id == Internship.id).filter(
        Collection.user_id == id,Collection.deleted==0).all()
    return res

def delete_wishlist(id):
    try:
        wishlist = Collection.query.get(id)
        wishlist.deleted = 1
        db.session.commit()
    except Exception as e:
        print(e)

def add_wishlist(id, internship_id):
    try:
        wish = Collection(id=getuuid(),
                 user_id=id,
                 internship_id=internship_id,
                 deleted=0)
        db.session.add(wish)
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