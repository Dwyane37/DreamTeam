class Config(object):
    DEBUG:True
    SECRET_KEY = 'Internship'
    JWT_SECRET_KEY = 'Internship'
    SESSION_COOKIE_NAME = False
    SERVER_NAME = '127.0.0.1:5000'
    JWT_TOKEN_LOCATION = 'headers'

class Data(object):
    HOSTNAME = '127.0.0.1'
    PORT = '3306'
    DATABASE = 'intern'
    USERNAME = 'root'
    PASSWORD = '123456'
    DB_URI='mysql+pymysql://{username}:{password}@{host}:{port}/{db}'.format(username=USERNAME,password=PASSWORD,
                                                                       port=PORT,host=HOSTNAME,db=DATABASE)
    SQLALCHEMY_DATABASE_URI=DB_URI
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True