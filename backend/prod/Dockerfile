# ---- Backend: PRODUCTION (gunicorn, non-root user, port 3002) ----
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=3002

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run as an unprivileged user
RUN useradd --create-home appuser && chown -R appuser /app
USER appuser

EXPOSE 3002

# Shell form so ${PORT} is expanded; exec keeps gunicorn as PID 1 for clean shutdown
CMD exec gunicorn --bind 0.0.0.0:${PORT} --workers 2 --access-logfile - --error-logfile - app:app
