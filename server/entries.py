import json
import os.path
import sqlite3

class EntriesDB:
   def __init__(self, filename):
      # Connect to our DB file
      self.connection = sqlite3.connect(filename, check_same_thread=False)

      # Use connection instance to perform our database operations
      # Create a cursor instance for the conection
      self.cursor = self.connection.cursor()

   def getEntries(self):
      # Now that we have an access point, we cna fetch all or one
      # ONLY applicable use of fetch is following a SELECT query
      self.cursor.execute("""SELECT * FROM entries""")
      entries = self.cursor.fetchall()
      return entries
   
   def getEntry(self, id):
      data = [id]
      # Now that we have an access point, we cna fetch all or one
      # ONLY applicable use of fetch is following a SELECT query
      self.cursor.execute("""SELECT * FROM entries WHERE id = ?""", data)
      entry = self.cursor.fetchone()
      return entry
   
   def createEntry(self, date, time, title, summary, todo, questions, ideas):
      data = [date,time, title, summary, todo, questions, ideas]
      # Add a new item to the database
      self.cursor.execute("""INSERT INTO entries 
                     (date, time, title, summary, todo, questions, ideas)
                     VALUES
                     (?, ?, ?, ?, ?, ?, ?)
                     """, data)
      self.connection.commit()

   def updateEntry(self, id, date, time, title, summary, todo, questions, ideas):
      data = [date, time, title, summary, todo, questions, ideas, id]

      self.cursor.execute("""
            UPDATE entries
            SET date = ?, time = ?, title = ?, summary = ?, todo = ?, questions = ?, ideas = ?
            WHERE id = ?
         """, data)
      
      self.connection.commit()

   def deleteEntry(self, id):
      data = [id]

      self.cursor.execute("""DELETE FROM entries WHERE id = ?""", data)
      self.connection.commit()

   def __enter__(self):
      return self

   def __exit__(self, exc_type, exc_value, traceback):
      self.connection.close()
   
   def close(self):
      self.connection.close()




####################################
####################################



# class DummyDB:

#    def __init__(self, filename):

#       self.filename = filename

#       if not os.path.isfile(filename):

#          with open(self.filename, 'w') as f:

#             json.dump([], f)


#    def saveRecord(self, record):
#       all_records = self.readAllRecords() 
#       record["id"] = len(all_records) 
#       all_records.append(record) 
#       with open(self.filename, 'w') as f: 
#          json.dump(all_records, f) 



#    def readAllRecords(self):

#       with open(self.filename, 'r') as f:

#          return json.load(f)