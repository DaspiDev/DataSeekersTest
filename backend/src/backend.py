from flask import Flask, request
from flask_pymongo import PyMongo
from flask_cors import CORS

backend = Flask(__name__)
backend.config['MONGO_URI']='mongodb://localhost/dataSeekers'
mongo = PyMongo(backend)

CORS(backend)

db = mongo.db.dataSeekers

@backend.route('/users', methods=['POST'])
def createUser():
    db.insert_one({
        'name': 'juan'
    })
    return 'received'

@backend.route('/users', methods=['GET'])
def getUsers():
    print(request.json)
    return 'received'

@backend.route('/user/<id>', methods=['GET'])
def getUser():
    return 'received'

if __name__ == "__main__":
    backend.run(debug=True)
