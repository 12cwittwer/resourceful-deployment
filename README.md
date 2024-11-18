#GUIDE FOR WORKING APPLICATION
#SITE SHOULD BE ACCESSIBLE AT cw.coureur.life NO OTHER CHANGES NEED TO BE MADE
**Apply Docker Files**
```
Ensure docker is installed.
Dockerfiles are located in their correct directories. No need to change or update them.
Use docker-compose up -d in order to build these files. This should be used for local testing.
Any changes made to Dockerfile and images were updated with the following commands:

docker tag example YOUR-USER-NAME/example
docker push YOUR-USER-NAME/example
```
**Apply the YAML Files**  
   Ensure your Kubernetes is running and configured. Then apply the YAML files:
```
kubectl apply -f server.yaml
kubectl apply -f client.yaml
kubectl apply -f ingress.yaml
Ingress is already set and the site should be accessible at https://cw.coureur.life/
Docker images are also configuired and can be accessed at austin963/server and austin963/client on dockerhub
```

# Work Journal Entries REST API

A REST API for managing and accessing work journal entries.

## Table of Contents

- [Data Organization](#data-organization)
- [SQL Schema](#sql-schema)
- [API Endpoints](#api-endpoints)

## Data Organization
```
{
  "id": DB Given ID,
  "date": Entry creation date (MM/DD/YYYY),
  "time": Entry creation time (HH:MM),
  "title": Title of entry,
  "summary": Summary of workday,
  "todo": Next to do list,
  "questions": List of questions from workday,
  "ideas": Ideas for future work
}
```

## SQL Schema

```
CREATE TABLE entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    time TEXT,
    title TEXT,
    summary TEXT,
    todo TEXT,
    questions TEXT,
    ideas TEXT
);
```

## API Endpoints

```
URL = http://127.0.0.1:8080
```

### GET Singular
- Retrieves a singular entry based on the ID
- Methods: GET
- Required Headers: none

```
http://127.0.0.1:8080/logs/<id>
```
id = ID of entry.


### GET All
- Retrieves all entries.
- Methods: GET
- Required Headers: none
```
http://127.0.0.1:8080/logs
```

### POST
- Creates a new entry
- Methods: POST
- Required Headers: "Content-Type": "application/x-www-form-urlencoded"

```
http://localhost:8080/logs
```


### PUT
- Edits an existing entry based on ID.
- Methods: PUT
- Required Headers: "Content-Type": "application/x-www-form-urlencoded"

```
http://127.0.0.1:8080/logs/<id>
```
id = ID of entry.

### DELETE
- Removes an existing entry.
- Methods: DELETE
- Required Headers: "Content-Type": "application/x-www-form-urlencoded"
```
http://127.0.0.1:8080/logs/<id>
```
id = ID of entry.
