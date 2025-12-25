#!/bin/bash

# Start nginx
nginx

# Start FastAPI backend
uvicorn app.main:app --host 127.0.0.1 --port 8000
