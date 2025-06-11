from flask import Flask, render_template


app = Flask(__name__)


@app.route(rule='/')
def about():
    return render_template('index.html')


@app.route(rule='/contact')
def contact():
    return render_template('contact.html')


if __name__ == '__main__':
    app.run()


# docker build -t portfolio:v0.0.1 .
# docker run -p 127.0.0.1:8000:5000 portfolio:v0.0.1

# docker update --restart always container_name
# docker inspect -f "{{ .HostConfig.RestartPolicy }}" container_name

# This command to use docker without the need of sudo (add current user to docker group)
# May need to create docker group first
# May need to log out and log back in to take effect
# sudo gpasswd -a $USER docker
