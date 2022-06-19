from flask import Flask
from config import Config,Data
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from data.models import *

jwt = JWTManager()

app = Flask(__name__, static_url_path='/')
app.config.from_object(Config)
app.config.from_object(Data)
jwt.init_app(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
CORS(app, supports_credentials=True)

@app.route("/", endpoint="test")
def test():
    res = db.session.query(User)
    for row in res:
        print(row.id, row.username)

    return 'hellp'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



