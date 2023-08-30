from flask import Flask, render_template, redirect, request, session
from flask_session import Session
import requests

app = Flask(__name__)

# https://www.geeksforgeeks.org/how-to-use-flask-session-in-python-flask/


github_target_url = ""

# configure sessions
app.config[""]


def loginWithGithub():
    pass 
    
@app.route("/logout")
def logout():
    session.pop()



if __name__ == "__main__":
    app.run(port=8000)

