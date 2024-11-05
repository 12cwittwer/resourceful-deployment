from flask import Flask, request
from entries import EntriesDB

DATABASE = "journal.db"

app = Flask(__name__)
db = EntriesDB("journal.db")
print("db", db.getEntries())

@app.route("/logs/<int:id>", methods=["OPTIONS"])
def handle_cors_options(id):
    return "", 204, {"Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type"
            }

@app.route("/logs", methods=["GET"])
def retrieve_logs():
    with EntriesDB(DATABASE) as db:
        logs = db.getEntries()
        formatted_logs = []
        for entry in logs:
            formatted_logs.append({
                "id": entry[0],
                "date": entry[1],
                "time": entry[2],
                "title": entry[3],
                "summary": entry[4],
                "todo": entry[5],
                "questions": entry[6],
                "ideas": entry[7]
            })
        return formatted_logs, 200, {"Access-Control-Allow-Origin" : "*"}
    
@app.route("/logs/<int:id>", methods=["GET"])
def get_log(id):
    with EntriesDB(DATABASE) as db:
        entry = db.getEntry(id)
        if not entry:
            return f"Entry with id {id} not found", 404, {"Access-Control-Allow-Origin" : "*"}
        formatted_log = {
                "id": entry[0],
                "date": entry[1],
                "time": entry[2],
                "title": entry[3],
                "summary": entry[4],
                "todo": entry[5],
                "questions": entry[6],
                "ideas": entry[7]
            }
        return formatted_log

@app.route("/logs", methods=["POST"])
def create_log():
    with EntriesDB(DATABASE) as db:
        print("The request data is: ", request.form)
        record = { # record is used only for printing
            "date": request.form.get("date"),
            "time": request.form.get("time"),
            "title": request.form.get("title"),
            "summary": request.form.get("summary"),
            "todo": request.form.get("todo"),
            "questions": request.form.get("questions"),
            "ideas": request.form.get("ideas")
        }
        date = request.form.get("date")
        time = request.form.get("time")
        title = request.form.get("title")
        summary = request.form.get("summary")
        todo = request.form.get("todo")
        questions = request.form.get("questions")
        ideas = request.form.get("ideas")
        print(record)
        db.createEntry(date,time,title,summary,todo,questions,ideas)
        return "Created", 201, {"Access-Control-Allow-Origin" : "*"}

@app.route("/logs/<int:id>", methods=["PUT"])
def update_log(id):
    with EntriesDB(DATABASE) as db:
        if not db.getEntry(id):
            return f"Entry with id {id} not found", 404, {"Access-Control-Allow-Origin" : "*"}
        date = request.form.get("date")
        time = request.form.get("time")
        title = request.form.get("title")
        summary = request.form.get("summary")
        todo = request.form.get("todo")
        questions = request.form.get("questions")
        ideas = request.form.get("ideas")

        db.updateEntry(id, date,time,title,summary,todo,questions,ideas)

    return "Entry Updated", 200, {"Access-Control-Allow-Origin": "*"}

@app.route("/logs/<int:id>", methods=["DELETE"])
def delete_log(id):
    with EntriesDB(DATABASE) as db:
        if not db.getEntry(id):
            return f"Entry with id {id} not found", 404, {"Access-Control-Allow-Origin" : "*"}
        db.deleteEntry(id)
    return "", 204, {"Access-Control-Allow-Origin": "*"}

def run():
    app.run(port=8080)

if __name__ == "__main__":
    run()
