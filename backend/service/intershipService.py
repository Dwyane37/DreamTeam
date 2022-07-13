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

    if field == '' and location == '' and type == '':
        res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key))).all()
    elif field == '' and location == '' and type != '':
        res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                      Internship.type == type).all()
    elif field == '' and location != '' and type == '':
        if state != '' and city != '':
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.state == state,
                                          Internship.city == city).all()
        elif state != '' and city == '':
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.state == state).all()
        else:
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location).all()

    elif field != '' and location == '' and type == '':
        res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                      Internship.field == field).all()
    elif field != '' and location != '' and type == '':
        if state != '' and city != '':
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.field == field,
                                          Internship.state == state,
                                          Internship.city == city).all()
        elif state != '' and city == '':
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.field == field,
                                          Internship.state == state).all()
        else:
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.field == field,
                                          Internship.location == location).all()

    elif field != '' and location == '' and type != '':
        res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                      Internship.field == field,
                                      Internship.type == type).all()
    elif field == '' and location != '' and type != '':
        if state != '' and city != '':
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.type == type,
                                          Internship.state == state,
                                          Internship.city == city).all()
        elif state != '' and city == '':
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.type == type,
                                          Internship.state == state).all()
        else:
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.type == type,
                                          Internship.location == location).all()

    else:
        if state != '' and city != '':
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.type == type,
                                          Internship.state == state,
                                          Internship.field == field,
                                          Internship.city == city).all()
        elif state != '' and city == '':
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.location == location,
                                          Internship.type == type,
                                          Internship.field == field,
                                          Internship.state == state).all()
        else:
            res = db.session.query.filter(Internship.title.like('%{keyword}%'.format(keyword=key)),
                                          Internship.type == type,
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
    field = resume.field
    aim = resume.aim
    address = resume.address
    res = Internship.query.all()
    list = []
    for e in res:
        temp = e.title + " " + e.location + " " + e.field
        if e.state != "":
            temp = temp + " " + e.state
            if e.city != "":
                temp = temp + " " + e.city
        list.append(temp.lower())
    descrip = field + " " + aim + " " + address + " "
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