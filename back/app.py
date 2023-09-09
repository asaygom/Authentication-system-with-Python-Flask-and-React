import os
from flask import Flask, jsonify, request, session
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db, User
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_bcrypt import Bcrypt

BASEDIR = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:admin@localhost/postgres_4g"
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["SECRET_KEY"] = "pass-key"
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


@app.route("/signup", methods=["POST"])
def signup():
    user = User()
    data = request.get_json()
    user.name = data['name']
    user.last_name = data['last_name']
    user.email = data['email']
    password_hash = bcrypt.generate_password_hash(data["password"]).decode("utf-8") 
    user.password = password_hash

    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user.email)
            
    return jsonify({ 
        "msg" : "User created successfully",
        "access_token": access_token,
        "success":True
        }), 200


@app.route("/login", methods=["POST"])
def login():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    data = request.get_json()
    email = data["email"]
    password = data["password"]
    if not email:
        return jsonify({"error": "Missing email parameter"}), 400
    if not password:
        return jsonify({"error": "Missing password parameter"}), 400
    user = User.query.filter_by(email=email).first()

    if user is not None:
        current_password = user.password
        is_valid = bcrypt.check_password_hash(current_password, password)
        if is_valid:
             access_token = create_access_token(identity=email)
             return jsonify({
                 "access_token": access_token,
                 "user": user.to_dict(),
                 "success":True
             }), 200
        else:
             return jsonify({
                "msg": "Invalid credentials",
                "success":False
             }),400
    else:
        return jsonify({
            "msg": "Invalid credentials",
            "success":False
        }),404

@app.route("/get_profile")
@jwt_required()
def get_profile():
    email=get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    return jsonify({
         "user":user.to_dict(),
         "success":True
     })

    
@app.route("/logout")
def logout():
    session.clear()
    return jsonify({
        "msg": "logout"
    })


if __name__ == "__main__":
    app.run(host="localhost",port="5000")
