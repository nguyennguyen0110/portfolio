from flask import Flask, render_template
from route.vi import vi_bp


app = Flask(__name__)
app.register_blueprint(vi_bp, url_prefix='/vi')


@app.route(rule='/')
def about():
    return render_template('index.html')


@app.route(rule='/experience')
def experience():
    return render_template('experience.html')


@app.route(rule='/skill')
def skill():
    return render_template('skill.html')


@app.route(rule='/education')
def education():
    return render_template('education.html')


@app.route(rule='/project')
def project():
    return render_template('project.html')


if __name__ == '__main__':
    app.run()
