from flask import Flask, render_template, redirect, request, session
from flask_session import Session
import requests

app = Flask(__name__)

github_target_url = ""

GITHUB_CLIENT_ID = "630fcc6321fa2f336446"

# configure sessions
app.config[""]


def loginWithGithub():
    pass 
    
@app.route("/logout")
def logout():
    session.pop()



if __name__ == "__main__":
    app.run(port=8000)

