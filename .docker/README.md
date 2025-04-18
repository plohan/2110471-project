# Server

build
```bash
docker build -t sendhelp -f .docker/server.Dockerfile .
```

To run the application with Docker:

```bash
docker run \
--init \
-p 8000:8000 \
-e DATA_DIR=/var/lib/sendhelp/db.json \
-v $(pwd)/data:/var/lib/sendhelp sendhelp
```

This command:
- Runs the Docker container with initialization
- Maps port 8000 from the container to your local machine
- Mounts your local db.json file to the container's /app/db.json path
- Uses the "sendhelp" Docker image
