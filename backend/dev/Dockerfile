# ---- Backend: DEVELOPMENT (Flask dev server with auto-reload, port 3001) ----
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    FLASK_APP=app.py \
    PORT=3001

WORKDIR /app

# Install dependencies first so Docker caches this layer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run as an unprivileged user
RUN useradd --create-home appuser && chown -R appuser /app
USER appuser

EXPOSE 3001

# Shell form so ${PORT} from the .env file is expanded; exec keeps flask as PID 1.
CMD exec flask run --host=0.0.0.0 --port=${PORT} --debug
