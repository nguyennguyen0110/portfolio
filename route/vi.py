from flask import Blueprint, render_template

vi_bp = Blueprint('vi', __name__)


@vi_bp.route(rule='')
def about():
    return render_template('vi/vi_index.html')


@vi_bp.route(rule='/experience')
def experience():
    return render_template('vi/vi_experience.html')


@vi_bp.route(rule='/skill')
def skill():
    return render_template('vi/vi_skill.html')


@vi_bp.route(rule='/education')
def education():
    return render_template('vi/vi_education.html')


@vi_bp.route(rule='/project')
def project():
    return render_template('vi/vi_project.html')
