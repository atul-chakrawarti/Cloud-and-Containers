# ---- Frontend: Flask + Jinja templates (multi-stage build, port 3000) ----

# Stage 1: build a virtualenv with all dependencies
FROM python:3.11-slim AS builder
WORKDIR /build
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Stage 2: slim runtime image with only the venv and app code
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/venv/bin:$PATH" \
    PORT=3000

WORKDIR /app
COPY --from=builder /opt/venv /opt/venv
COPY . .

RUN useradd --create-home appuser && chown -R appuser /app
USER appuser

EXPOSE 3000

CMD exec gunicorn --bind 0.0.0.0:${PORT} --workers 2 --access-logfile - --error-logfile - app:app
