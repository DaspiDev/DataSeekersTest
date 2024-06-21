from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

from bson import ObjectId

backend = Flask(__name__)
backend.config['MONGO_URI']='mongodb://localhost/dataSeekers'
mongo = PyMongo(backend)

CORS(backend)

db = mongo.db.users

@backend.route('/users', methods=['POST'])
def createUser():
    id = db.insert_one({
        'name': request.json['name'],
        'connections': []
    })
    return jsonify(str(id.inserted_id))

@backend.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'connections': str(doc['connections'])
        })
    return jsonify(users)

@backend.route('/users/<id>/<id2>', methods=['PUT'])
def connectUsers(id, id2):
    user1 = db.find_one({'_id': ObjectId(id)})
    user2 = db.find_one({'_id': ObjectId(id2)})
    connections1 = user1['connections']
    connections2 = user2['connections']
    connections1.append(user2['_id']) if user2['_id'] not in connections1 else connections1
    connections2.append(user1['_id']) if user1['_id'] not in connections2 else connections2
    db.update_one({'_id': ObjectId(id)}, {"$set": {
        'name': user1['name'],
        'connections': connections1
    }})
    db.update_one({'_id': ObjectId(id2)}, {"$set": {
        'name': user2['name'],
        'connections': connections2
    }})
    return jsonify({'message': 'Users connected'})

@backend.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})
    return jsonify({
      '_id': str(ObjectId(user['_id'])),
      'name': user['name'],
      'connections': str(user['connections'])
  })

@backend.route('/userConnections/<id>', methods=['GET'])
def getUserConnections(id):
    user = db.find_one({'_id': ObjectId(id)})
    connections = []
    for doc in user['connections']:
        connected = db.find_one({'_id': ObjectId(doc)})
        connections.append({
            '_id': str(connected['_id']),
            'name': connected['name'],
            'connections': str(connected['connections'])
        })
    return jsonify(connections)


if __name__ == "__main__":
    backend.run(debug=True)
