from flask import Flask, Response, send_file
from config import Config,Data
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from interface.userApi import *
from interface.intershipApi import *
from interface.reviewApi import *
from flasgger import Swagger,swag_from
from flask_restx import *
jwtt = JWTManager()

app = Flask(__name__, static_url_path='/')
Swagger(app)
app.config.from_object(Config)
app.config.from_object(Data)
# app.register_blueprint(user_opt, url_prefix="/user/")
# app.register_blueprint(internship_opt, url_prefix="/internship/")
app.register_blueprint(review_opt, url_prefix="/review/")
mail.init_app(app)
jwtt.init_app(app)
db.init_app(app)
migrate = Migrate(app, db)
CORS(app, supports_credentials=True)
api = Api(app)
@app.route("/", endpoint="test")
def test():
    return 'hello'

#-----------------------用户userApi接口-------------------------
@api.route("/user/register")
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class Register(Resource):
    @api.doc(params={'password':'password','email':"email","type":"type",'username':'username'})
    def post(self):
        parser = api.parser()

        parser.add_argument('password', type=str, location='args')
        parser.add_argument('email', type=str, location='args')
        parser.add_argument('username', type=str, location='args')
        parser.add_argument('type', type=str, location='args')
        # data = json.loads(request.data)
        # print(data)
        password = parser.parse_args()['password']
        email = parser.parse_args()['email']
        type = parser.parse_args()['type']
        username = parser.parse_args()['username']
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
        # token = jwt.encode(mes, token_key, algorithm='HS256')
        data = {}
        data['id'] = id
        # data['token'] = token
        message = errorMessage(200, data)
        # deco = jwt.decode(token,
        #                   token_key, algorithms='HS256', options={"varify_signature": False})
        # exptime = deco['exp']
        return json.dumps(message, default=lambda obj: obj.__dict__)

parser1 = api.parser()
parser1.add_argument('username', type=str, location='args')
parser1.add_argument('password', type=str, location='args')
@api.route("/user/login",methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class login(Resource):
    # data = json.loads(request.form.get('data'))
    @api.doc(parser=parser1)
    def get(self,username,password):
        # username = request.values.get('username')
        # password = request.values.get('password')
        global login_users
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

parser2 = api.parser()
parser2.add_argument('token', type=str, location='args')
parser2.add_argument('old_password', type=str, location='args')
parser2.add_argument('new_password', type=str, location='args')
@api.route("/user/changepassword",methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class changepassword(Resource):
    @api.doc(parser=parser2)
    def get(self,token,old_password,new_password):
        # token = request.values.get('token')
        # old_password = request.values.get('old_password')
        # new_password = request.values.get('new_password')
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

parser3 = api.parser()
parser3.add_argument('email', type=str, location='args')
@api.route("/user/forget", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class forget(Resource):
    @api.doc(parser=parser3)
    def get(self):
        # email = request.values.get("email")
        email = request.args.get("email")
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

parser4 = api.parser()
parser4.add_argument('email', type=str, location='args')
parser4.add_argument('password', type=str, location='args')
@api.route("/user/resetpassword")
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class resetpassword(Resource):
    @api.doc(parser=parser4)
    def get(self):
        email = request.args.get('email')
        password = request.args.get('password')
        message = reset_password(email, password)
        return json.dumps(message, default=lambda obj: obj.__dict__)


parser5 = api.parser()
parser5.add_argument('token', type=str, location='args')
@api.route("/user/logout")
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class logout(Resource):
    @api.doc(parser=parser5)
    def get(self):
        token = request.args.get('token')
        deco_token = jwt.decode(token, token_key, algorithms='HS256')
        id = deco_token['id']
        # id = request.values.get('id')
        message = logout_user(id)
        username = message.errormessage
        if username in login_users:
            login_users.remove(username)
        message = errorMessage(200, "ok")
        return json.dumps(message, default=lambda obj: obj.__dict__)

parser6 = api.parser()
parser6.add_argument('token', type=str, location='args')
@api.route("/user/getinfo", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class getinfo(Resource):
    @api.doc(parser=parser6)
    def get(self):
        token = request.args.get('token')
        deco_token = jwt.decode(token, token_key, algorithms='HS256')
        id = deco_token['id']
        res = get_info(id)
        data = {}
        data['data'] = res
        data['errortype'] = 200
        return data

# update 7.24
@api.route("/user/upload_image", methods=['POST'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class upload_image(Resource):
    @api.doc(params={'user_id': 'user_id', 'image_base64': "image_base64"})
    def post(self):
        parser = api.parser()
        parser.add_argument('user_id', type=str, location='args')
        parser.add_argument('image_base64', type=str, location='args')
        user_id = parser.parse_args()['user_id']
        image_base64 = parser.parse_args()['image_base64']
        message = save_image_from_base64(user_id, image_base64)
        return json.dumps(message, default=lambda obj: obj.__dict__)


# update 7.24
@app.route("/user/image_thumbnail/<user_id>", methods=['GET'])
def query_image(user_id):
    return send_file(f"./image_thumbnail/{user_id}", mimetype='image/gif')

@api.route("/user/submitResume", methods=['POST'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class change_resume(Resource):
    @api.doc(params={'resumeid': 'resumeid', 'resume': "resume"})
    def post(self):
        parser = api.parser()
        parser.add_argument('resumeid', type=str, location='args')
        parser.add_argument('resume', type=str, location='args')
        resumeid = parser.parse_args()["resumeid"]
        resume = parser.parse_args()["resume"]
        message = update_resume(resumeid, resume)
        # update 7.24: 修改返回结果格式
        return json.dumps(message, default=lambda obj: obj.__dict__)

parser7 = api.parser()
parser7.add_argument('resumeId', type=str, location='args')
@api.route("/user/getResume", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class get_resume(Resource):
    @api.doc(parser=parser7)
    def get(self):
        user_id = request.args.get('resumeId')

        message = query_resume(user_id)
        # update 7.24: 修改返回结果格式
        return json.dumps(message, default=lambda obj: obj.__dict__)



parser8 = api.parser()
parser8.add_argument('followingId', type=str, location='args')
parser8.add_argument('followerId', type=str, location='args')
@api.route("/user/like", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class like(Resource):
    @api.doc(parser=parser8)
    def get(self):
        following_id = request.args.get('followingId')
        follower_id = request.args.get('followerId')
        message = user_like(following_id, follower_id)
        # update 7.24: 修改返回结果格式
        return json.dumps(message, default=lambda obj: obj.__dict__)


parser9 = api.parser()
parser9.add_argument('followingId', type=str, location='args')
parser9.add_argument('followerId', type=str, location='args')
@api.route("/user/dislike", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class dislike(Resource):
    @api.doc(parser=parser9)
    def get(self):
        following_id = request.args.get('followingId')
        follower_id = request.args.get('followerId')
        message = user_dislike(following_id, follower_id)
        # update 7.24: 修改返回结果格式
        return json.dumps(message, default=lambda obj: obj.__dict__)

#
parser10 = api.parser()
parser10.add_argument('userId', type=str, location='args')
@api.route("/user/following", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class following(Resource):
    @api.doc(parser=parser10)
    def get(self):
        user_id = request.args.get('userId')
        message = query_following(user_id)
        # update 7.24: 修改返回结果格式
        return json.dumps(message, default=lambda obj: obj.__dict__)


#
parser11 = api.parser()
parser11.add_argument('userId', type=str, location='args')
@api.route("/user/follower", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class follower(Resource):
    @api.doc(parser=parser11)
    def get(self):
        user_id = request.args.get('userId')
        message = query_follower(user_id)
        # update 7.24: 修改返回结果格式
        return json.dumps(message, default=lambda obj: obj.__dict__)


#--------------------------interhnship------------------------
@api.route('/internship/home')
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class initpage(Resource):

    def get(self):
        data = init()
        dict = {}
        for i in data:
            dict[repr(i.id)] = i.as_dict()
        # message = Message(200,"ok", dict)
        data = {}
        data['data'] = dict
        data['errortype'] = 200
        return data

parser12 = api.parser()
parser12.add_argument('key', type=str, location='args')
parser12.add_argument('field', type=str, location='args')
parser12.add_argument('location', type=str, location='args')
parser12.add_argument('right', type=str, location='args')
parser12.add_argument('city', type=str, location='args')
parser12.add_argument('state', type=str, location='args')
@api.route("/internship/search", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class searchInternship(Resource):
    @api.doc(parser=parser12)
    def get(self):
        key = request.args.get('key')
        field = request.args.get('field')
        location = request.args.get('location')
        type = request.args.get('right')
        city = request.args.get("city")
        state = request.args.get("state")
        print(key, field, location, type, city, state)
        res = search_intership(key, field, location, type,city,state)
        print("res:",res)
        dict = {}
        for i in res:
            dict[repr(i.id)] = i.as_dict()
        data = {}
        data['data'] = dict
        data['errortype'] = 200
        return data

parser13 = api.parser()
parser13.add_argument('id', type=str, location='args')
@api.route("/internship/view", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class view(Resource):
    @api.doc(parser=parser13)
    def get(self):
        id = request.args.get("id")
        job = searchJobById(id)

        return job.as_dict()

parser14 = api.parser()
parser14.add_argument('token', type=str, location='args')
@api.route("/internship/recommand", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class recommand(Resource):
    @api.doc(parser=parser14)
    def get(self):
        token = request.args.get('token')
        deco_token = jwt.decode(token, token_key, algorithms='HS256')
        id = deco_token['id']
        recomm_lst = getRecommJobs(id)
        dict = {}
        for i in recomm_lst:
            dict[repr(i.id)] = i.as_dict()
        data = {}
        data['data'] = dict
        data['errortype'] = 200
        return data

parser15 = api.parser()
parser15.add_argument('token', type=str, location='args')
@api.route("/internship/getcurrentjobs", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class getcurrentjobs(Resource):
    @api.doc(parser=parser15)
    def get(self):
        res = getCurrentJobs()
        dict = {}
        for i in res:
            dict[repr(i.id)] = i.as_dict()
        data = {}
        data['data'] = dict
        data['errortype'] = 200
        return data


@api.route("/internship/gethotjobs", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class gethotjobs(Resource):
    def get(self):
        res = getHotJobs()
        dict = {}
        for i in res:
            dict[repr(i.id)] = i.as_dict()
        data = {}
        data['data'] = dict
        data['errortype'] = 200
        return data

parser16 = api.parser()
parser16.add_argument('token', type=str, location='args')
@api.route("/internship/save", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class add(Resource):
    @api.doc(parser=parser16)
    def get(self):
        token = request.args.get('token')
        deco = jwt.decode(token, token_key, algorithms='HS256')
        id = deco['id']
        internship_id = request.values.get('internship')
        add_wishlist(id, internship_id)
        return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

parser17 = api.parser()
parser17.add_argument('wishlist_id', type=str, location='args')
@api.route('/internship/unsave', methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class delete(Resource):
    @api.doc(parser=parser17)
    def get(self):
        id = request.args.get("wishlist_id")
        delete_wishlist(id)
        return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

parser18 = api.parser()
parser18.add_argument('id', type=str, location='args')
@api.route("/internship/getuserwishlist", methods=["GET"])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class getuserwishlist(Resource):
    @api.doc(parser=parser18)
    def get(self):
        id = request.args.get("id")
        res = get_wish_list(id)
        # dict = {}
        # dict['data'] = res
        print(res)
        # res = [dict(zip(r.keys(),r)) for r in res]
        res = [dict(zip(result.keys(), result)) for result in res]
        for i in res:
            print(i)
        data = {}
        data['data'] = res
        data['errortype'] = 200
        return data

parser19 = api.parser()
parser19.add_argument('id', type=str, location='args')
parser19.add_argument('internship_id', type=str, location='args')
@api.route("/internship/apply", methods=["GET"])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class apply(Resource):
    @api.doc(parser=parser19)
    def get(self):
        id = request.args.get("id")
        internship_id = request.args.get("internship_id")
        message = checkIfApplied(id,internship_id)
        if message.errortype == 1:
            return json.dumps(message, default=lambda obj: obj.__dict__)
        apply_internship(id, internship_id)

        return json.dumps(errorMessage(200, "ok"),default=lambda obj: obj.__dict__)

parser20 = api.parser()
parser20.add_argument('id', type=str, location='args')
@api.route("/internship/getapplylist", methods=["GET"])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class getapplylist(Resource):
    @api.doc(parser=parser20)
    def get(self):
        id = request.args.get("id")
        res = get_apply_list(id)
        # dict = {}
        # dict['data'] = res
        res = [dict(zip(result.keys(), result)) for result in res]
        for i in res:
            print(i)
        data = {}
        data['data'] = res
        data['errortype'] = 200
        return data

# He
@api.route("/internship/add_internship", methods=['Post'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class add_internship(Resource):
    @api.doc(params={'title': 'title', 'field': "field", "location": "location", 'state': 'state','city':'city','working_right':'working_right','description':'description','meetings':'meetings'})
    def post(self):
        # data = json.loads(request.data)
        parser20 = api.parser()
        parser20.add_argument('title', type=str, location='args')
        parser20.add_argument('field', type=str, location='args')
        parser20.add_argument('location', type=str, location='args')
        parser20.add_argument('state', type=str, location='args')
        parser20.add_argument('city', type=str, location='args')
        parser20.add_argument('working_right', type=str, location='args')
        parser20.add_argument('description', type=str, location='args')
        parser20.add_argument('meeting', type=str, location='args')
        title = parser20.parse_args()['title']
        field = parser20.parse_args()['field']
        location = parser20.parse_args()['location']
        state = parser20.parse_args()['state']
        city = parser20.parse_args()['city']
        working_right = parser20.parse_args()['working_right']
        description = parser20.parse_args()['description']
        meetings = parser20.parse_args()['meeting']
        if working_right == 'international student':
            working_right = 0
        else:
            working_right = 1
        internship = Internship(title=title, field=field, location=location, state=state, city=city,
                                working_right=working_right, description=description,
                               )
        mesvalue = addNewjob(internship)

        # add meetings
        for meeting in meetings:
            datetime = meeting['datetime']
            link = meeting['link']
            meeting = Meeting(intership_id=id,
                               datetime=datetime, link=link,
                               deleted=0,
                               )
            save_meeting=addmeeting(meeting)

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


@api.route("/internship/edit_internship", methods=['Post'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class edit_internship(Resource):
    @api.doc(params={'title': 'title', 'field': "field", "location": "location", 'state': 'state', 'city': 'city',
                     'working_right': 'working_right', 'description': 'description', 'meetings': 'meetings'})
    def post(self):
    # data = json.loads(request.data)
        parser20 = api.parser()
        parser20.add_argument('title', type=str, location='args')
        parser20.add_argument('field', type=str, location='args')
        parser20.add_argument('location', type=str, location='args')
        parser20.add_argument('state', type=str, location='args')
        parser20.add_argument('city', type=str, location='args')
        parser20.add_argument('working_right', type=str, location='args')
        parser20.add_argument('description', type=str, location='args')
        parser20.add_argument('meeting', type=str, location='args')

        title = parser20.parse_args()['title']
        field = parser20.parse_args()['field']
        location = parser20.parse_args()['location']
        state = parser20.parse_args()['state']
        city = parser20.parse_args()['city']
        working_right = parser20.parse_args()['working_right']
        description = parser20.parse_args()['description']
        meetings = parser20.parse_args()['meeting']
        if working_right == 'international student':
            working_right = 0
        else:
            working_right = 1
        internship = Internship(id=id, title=title, field=field, location=location, state=state, city=city,
                               working_right=working_right, description=description,
                               )
        mesvalue = editjob(internship)

        # add meetings
        for meeting in meetings:
            datetime = meeting['datetime']
            link = meeting['link']
            meeting = Meeting(intership_id=id,
                                 datetime=datetime, link=link,
                                 deleted=0,
                                 create_time=getTime(datetime),
                                 update_time=getTime(datetime))
            save_meeting = editmeeting(meeting)
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


@api.route("/internship/del_internship", methods=['Post'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class del_internship(Resource):
    @api.doc(params={'title': 'title', 'field': "field", "location": "location", 'state': 'state', 'city': 'city',
                     'working_right': 'working_right', 'description': 'description', 'meetings': 'meetings'})
    def post(self):
        # data = json.loads(request.data)
        parser20 = api.parser()
        parser20.add_argument('title', type=str, location='args')
        parser20.add_argument('field', type=str, location='args')
        parser20.add_argument('location', type=str, location='args')
        parser20.add_argument('state', type=str, location='args')
        parser20.add_argument('city', type=str, location='args')
        parser20.add_argument('working_right', type=str, location='args')
        parser20.add_argument('description', type=str, location='args')
        parser20.add_argument('meeting', type=str, location='args')

        title = parser20.parse_args()['title']
        field = parser20.parse_args()['field']
        location = parser20.parse_args()['location']
        state = parser20.parse_args()['state']
        city = parser20.parse_args()['city']
        working_right = parser20.parse_args()['working_right']
        description = parser20.parse_args()['description']
        meetings = parser20.parse_args()['meeting']
        if working_right == 'international student':
            working_right = 0
        else:
            working_right = 1
        internship = Internship(id=id, title=title, field=field, location=location, state=state, city=city,
                               working_right=working_right, description=description,
                                )
        mesvalue =deletejob(internship)
        # del meetings
        for meeting in meetings:
            datetime = meeting['datetime']
            link = meeting['link']
            meeting = Meeting(intership_id=id,
                              datetime=datetime, link=link,
                              deleted=1,
                              create_time=getTime(datetime),
                              update_time=getTime(datetime))
            save_meeting = deletemeeting(meeting)
        start_date = time.time() + 3600
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


@api.route("/internship/del_meeting", methods=['Post'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class del_meeting(Resource):
    @api.doc(params={'id': 'id', 'datetime': "datetime", "link": "link"})
    def post(self):
    # data = json.loads(request.data)
        parser20 = api.parser()
        parser20.add_argument('id', type=str, location='args')
        parser20.add_argument('datetime', type=str, location='args')
        parser20.add_argument('link', type=str, location='args')
        id = parser20.parse_args()['id']
        datetime = parser20.parse_args()['datetime']
        link = parser20.parse_args()['link']
        meeting = Meeting(intership_id=id,
                          datetime=datetime, link=link,
                          deleted=1,
                          create_time=getTime(datetime),
                          update_time=getTime(datetime)
                          )
        save_meeting = deletemeeting(meeting)
        # data['id'] = id
        # data['token'] = token
        message = errorMessage(200, [])
        # deco = jwt.decode(token,
        #                   token_key, algorithms='HS256', options={"varify_signature": False})
        # exptime = deco['exp']

        return json.dumps(message, default=lambda obj: obj.__dict__)

#-------------------------------评论---------------------------

@api.route("/review/review",methods=['GET', 'POST'] )
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class review(Resource):
    @api.doc(params={'token': 'token', 'review': "review", "internship": "internship"})
    def get(self):
        # data = json.loads(request.data)
        parser21 = api.parser()
        parser21.add_argument('id', type=str, location='args')
        parser21.add_argument('internship_id', type=str, location='args')
        token = parser20.parse_args()['token']
        deco = jwt.decode(token, token_key, algorithms='HS256')
        id = deco['id']
        review = parser20.parse_args()['review']
        internship_id = parser20.parse_args()['internship']
        # message = checkIfUserReviewed(id,movie_id)
        # if message.errortype == 1:
        #     return json.dumps(message,default=lambda obj: obj.__dict__)

        review_internship(id,review,internship_id)

        # gain experience
        # gain_experience(id)

        return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

parser22 = api.parser()
parser22.add_argument('id', type=str, location='args')
@api.route("/review/deletereview", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class deletereview( Resource):
    @api.doc(parser=parser22)
    def get(self):
        id = request.args.get("id")
        delete_review(id)
        return json.dumps(errorMessage(200,"ok"),default=lambda obj: obj.__dict__)

parser23 = api.parser()
parser23.add_argument('id', type=str, location='args')
@api.route("/review/personreview", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class personreview(Resource):
    # token = request.values.get('token')
    # deco = jwt.decode(token, token_key, algorithms='HS256')
    @api.doc(parser=parser23)
    def get(self):
        id = request.args.get('id')
        res = getAllReviewsById(id)
        res = [dict(zip(result.keys(), result)) for result in res]
        if res is not None:
            res = [dict(zip(result.keys(), result)) for result in res]
        else:
            res = []
        data = {}
        data['data'] = res
        data['errortype'] = 200
        return data

parser24 = api.parser()
parser24.add_argument('movie_id', type=str, location='args')
@api.route("/internshipreview", methods=['GET'])
@api.response(200,'OK')
@api.response(400,'Bad Request')
@api.response(500,'Internal Server Error')
@api.response(404,'404 Not Found')
class internshipreview(Resource):
    @api.doc(parser=parser24)
    def get(self):
        id = request.args.get("movie_id")
        res = getInternReviewById(id)
        data = {}
        if res is not None:
            res = [dict(zip(result.keys(), result)) for result in res]
        else:
            res = []
        data['data'] = res
        data['errortype'] = 200
        return data

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5500, debug=True)



