FROM python:3.10

WORKDIR /backend

COPY . /backend

RUN pip install -r /backend/requirements.txt

EXPOSE 8080

CMD ["python3", "/backend/server.py"]
