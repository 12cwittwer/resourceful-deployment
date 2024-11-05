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
