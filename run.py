from flask import Flask
from app.views import index, testear_base

app = Flask(__name__)

app.route('/', methods = ['GET'])(index)
app.route('/probar_base', methods = ['POST'])(testear_base)

if __name__ == '__main__':
    app.run(debug=True)