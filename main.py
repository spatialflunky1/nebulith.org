# Required
import eventlet
eventlet.patcher.monkey_patch(select=True, socket=True)

from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, send
from flask_minify import Minify
import flask_login
import os
import github
from mutagen import mp3, File

app = Flask(__name__)
app.config['SECRET_KEY'] = 'f203f9m20doimpaops&*(@MD'
login_manager = flask_login.LoginManager()
login_manager.init_app(app)
socketio = SocketIO(app, cors_allowed_origins="*")
Minify(app=app, html=True, js=True, cssless=True)

# Mock user DB
# TODO: REMOVE THIS IMMEDIATELY
users = {"a@example.com": {"password": "123"}}

# Define empty class to store user information at runtime
class User(flask_login.UserMixin):
    pass

# Define login manager functions and login route
@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return
    user = User()
    user.id = email
    return user

@login_manager.request_loader
def request_loader(request):
    email = request.form.get('email')
    if email not in users:
        return
    user = User()
    user.id = email
    return user

@login_manager.unauthorized_handler
def unauthorized_handler():
    return render_template("error.html", error_num="401", error="Unauthorized", current_user=flask_login.current_user)

@app.route("/Login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html", current_user=flask_login.current_user)
    else:
        email = request.form["email"]
        if email in users and request.form["password"] == users[email]["password"]:
            user = User()
            user.id = email
            flask_login.login_user(user)
            return redirect("/")
        else:
            return render_template("login.html", error="Incorrect email or password!", current_user=flask_login.current_user)

@app.route("/Logout", methods=["GET"])
def logout():
    flask_login.logout_user()
    return redirect("/")

# Set default routes
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html", current_user=flask_login.current_user)

@app.route("/Downloads", methods=["GET"])
def downloads():
    return render_template("downloads.html", current_user=flask_login.current_user)

@app.route("/IRC", methods=["GET"])
@flask_login.login_required
def IRC():
    return render_template("irc.html", current_user=flask_login.current_user)

@app.route("/Blog", methods=["GET"])
def blog():
    return render_template("blog.html", current_user=flask_login.current_user)

@app.route("/Forum", methods=["GET"])
def forum():
    return render_template("forum.html", current_user=flask_login.current_user)

@app.route("/Music", methods=["GET"])
@flask_login.login_required
def music():
    return render_template("music.html", current_user=flask_login.current_user)

@app.route("/Music/Albums", methods=["GET"])
@flask_login.login_required
def albums():
    return render_template("albums.html", current_user=flask_login.current_user)

@app.route("/Music/Songs", methods=["GET"])
@flask_login.login_required
def songs():
    return render_template("songs.html", current_user=flask_login.current_user)

# Dynamic SocketIO content
@socketio.on('message', namespace="/")
def handle_connection(page):
    print(page)
    if page[0]=="artists":
        if len(page)>1 and page[1]=="ryan":
            content = os.listdir("static/r_music")
        else:
            content = os.listdir("static/music")
        send(content)
    elif page[0]=="albums":
        if len(page)>2 and page[2]=="ryan":
            content = os.listdir("static/r_music/"+page[1])
        else:
            content = os.listdir("static/music/"+page[1])
        content.remove("artist.png")
        send(content)
    elif page[0]=="songs":
        if (len(page)>3 and page[3]=="ryan"):
            songs = [i for i in os.listdir("static/r_music/"+page[1]+"/"+page[2]) if "mp3" in i]
            contents = []
            for filename in songs:
                content = []
                song = mp3.MP3("static/r_music/"+page[1]+"/"+page[2]+"/"+filename)
                minutes = str(int(song.info.length) // 60)
                seconds = int(song.info.length) % 60
                if (seconds < 10):
                    seconds = "0"+str(seconds)
                else:
                    seconds = str(seconds)
                content.append(str(song["TIT2"]))
                content.append(minutes)
                content.append(seconds)
                contents.append(content)
            send(contents)
        else:
            content = open("static/music/"+page[1]+"/"+page[2]+"/song_list.csv", "r").read().split('\n')
            for i in range(len(content)):
                content[i] = content[i].split(",")
            if [''] in content:
                content.remove([''])
            send(content)
    elif page[0]=="downloads":
        send(github.get_repo_names())

if __name__ == '__main__':
    socketio.run(app, host="localhost", port=500, debug=True)
