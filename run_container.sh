# Build and tag
docker build -t cstainsby-personal-website-repo .
docker tag cstainsby-personal-website-repo:latest public.ecr.aws/z9u0q9g9/cstainsby-personal-website-repo:latest

# Run
docker run --name personal-website -d -p 8080:8080 cstainsby-personal-website-repo:latest