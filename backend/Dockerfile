FROM python:3.12-alpine

WORKDIR /app

ENV PYTHONNUNBUFFERED=1

RUN apk add --no-cache gcc musl-dev libffi-dev postgresql-dev

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000