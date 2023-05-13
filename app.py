from flask import Flask
from flask import render_template

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the root URL ("/")
@app.route('/')
def hello_world():
    return render_template("base.html")

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True, port=8080)