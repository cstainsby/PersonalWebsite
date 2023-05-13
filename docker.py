import subprocess
import sys

TAG = "latest"
ECR_URL = "cstainsby-personal-website-repo"

def login() -> None:
    login_cmd = """aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/z9u0q9g9""".split(" ")
    subprocess.run(login_cmd)

def build() -> None:
    build_cmd = """docker build -t {ecr_repo} .""".format(ecr_repo=ECR_URL).split(" ")
    tag_cmd = """docker tag {ecr_repo}:{tag} public.ecr.aws/z9u0q9g9/cstainsby-personal-website-repo:latest""".format(ecr_repo=ECR_URL, tag=TAG).split(" ")
    subprocess.run(build_cmd)
    subprocess.run(tag_cmd)

def run() -> None:
    run_cmd = """docker run --name personal-website -d -p 8080:8080 {ecr_repo}:{tag}""".format(ecr_repo=ECR_URL, tag=TAG)
    subprocess.run(run_cmd)

def push() -> None:
    push_cmd = """docker push public.ecr.aws/z9u0q9g9/{ecr_repo}:{tag}""".format(ecr_repo=ECR_URL, tag=TAG).split(" ")
    subprocess.run(push_cmd)


if __name__ == "__main__":
    build()
    
    if len(sys.argv) > 1:
        if sys.argv[1] == "run":
            run()
        elif sys.argv[1] == "push":
            login()
            push()
        else:
            print("Invald argument passed")