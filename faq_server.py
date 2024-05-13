from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/query')
def endpoint1():
    data = {'message': 'This is get the data'}
    return jsonify(data)

@app.route('/get-question')
def endpoint2():
    data = {'message': 'This is to get question input'}
    return jsonify(data)

@app.route('/gen-answers')
def endpoint3():
    data = {'message': 'This is to generate answers'}
    return jsonify(data)

@app.route('/send-response')
def endpoint4():
    data = {'message': 'This endpoint will send response to client'}
    return jsonify(data)