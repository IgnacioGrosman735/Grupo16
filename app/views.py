from flask import jsonify
from app.database import testear_conexion

def index():
    return jsonify({"mensaje": "Soy una api nuevita"}), 200

def testear_base():
    try:
        testear_conexion()
        return jsonify({"Mensaje": "La conexión es un éxito"}), 200
    except BaseException as be:
        return jsonify({"Mensaje": "La conexión no funciona"}), 500
        