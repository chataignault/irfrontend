from flask import Flask
import os
from flask import *
from flask_sqlalchemy import SQLAlchemy
import json

# for df handling
import pandas as pd

file_path = os.path.abspath(os.getcwd())+"\database.db"
print(file_path)
 

app = Flask(__name__, static_url_path='')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'+file_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy()
db.init_app(app)

class ContactModel(db.Model):
    # __tablename__ = "table"
 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), unique=True)
 
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"{self.name}"

with app.app_context():
    db.create_all()

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

@app.route('/ping')
def ping():
    return ("hello world")

@app.route('/json_test')
def json_test():
    return jsonify({"test":"success"})

@app.route('/flask', methods=['GET'])
def index():
    return "Flask server"

@app.route('/data/create' , methods = ['GET','POST'])
def create():
    print(type(json.loads(request.data)), request.data)
    if request.method == 'GET':
        return jsonify({"success": True, "message": "this is the create endpoint"}), 201
 
    if request.method == 'POST':
        request_data = json.loads(request.data)
        name = request_data['name']
        contact = ContactModel(name=name)
        db.session.add(contact)
        db.session.commit()

        print("c ok")
    return jsonify({"success": True, "message": "contact added successfully"}), 201

def contact_serializer(contact):
    return {'name': contact.name}

@app.route('/data')
def retrieveDataList():
    return jsonify([*map(contact_serializer, ContactModel.query.all())]) #ContactModel.query.all()) ContactModel(name="leon")


@app.route('/data/delete', methods=['GET','POST'])
def delete():
    request_data = json.loads(request.data)
    name = request_data['name']
    contact = ContactModel.query.filter_by(name=name).first()
    if request.method == 'POST':
        if contact:
            db.session.delete(contact)
            db.session.commit()
            return jsonify({"success": True, "message": "Contact deleted successfully"}), 201
        abort(404)
 
    return jsonify({"success": True}), 201


# Deal with a DF
# @app.route('/data/dataframe', methods=['GET'])
# def display_dataframe():
#     df = pd.DataFrame({
#         "Nom":["Tom", "Didier", "Nana", "Jackie"],
#         "Age":[10,20,15,60],
#         "Taille":[150,160,180,150]
#     })
#     return df.to_json(orient="records")

@app.route('/data/dataframe/^FVX', methods=['GET'])
def display_dataframe_five():
    # path = os.path.join(r"C:\Users\leonc\leon\Cours\Cours3A\FI\PCA on Treasury Bonds", file_name)
    path = r"C:\Users\leonc\leon\Cours\Cours3A\FI\PCA on Treasury Bonds\^FVX.csv"
    df = pd.read_csv(path)
    return df.to_json(orient="records")

@app.route('/data/dataframe/^TNX', methods=['GET'])
def display_dataframe_ten():
    # path = os.path.join(r"C:\Users\leonc\leon\Cours\Cours3A\FI\PCA on Treasury Bonds", file_name)
    path = r"C:\Users\leonc\leon\Cours\Cours3A\FI\PCA on Treasury Bonds\^TNX.csv"
    df = pd.read_csv(path)
    return df.to_json(orient="records")



## Deal with a plot
from matplotlib import pyplot as plt
@app.route('/data/plot', methods=['GET'])
def render_plot():
    fig, ax = plt.subplots()
    ax.plot([1,2,3], [2,1,2])
    graphJSON = json.dumps(fig)
    return graphJSON


if __name__ == '__main__':
    app.run()