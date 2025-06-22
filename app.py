from flask import Flask, render_template


app = Flask(__name__)


@app.route(rule='/')
def about():
    return render_template('index.html')


@app.route(rule='/experience')
def experience():
    return render_template('experience.html')


@app.route(rule='/skill')
def contact():
    return render_template('skill.html')


@app.route(rule='/education')
def education():
    return render_template('education.html')


@app.route(rule='/project')
def project():
    return render_template('project.html')


if __name__ == '__main__':
    app.run()
