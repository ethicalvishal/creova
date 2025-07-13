import sqlite3

# Path to your SQLite database
DB_PATH = 'creova.db'

# Connect to the database
conn = sqlite3.connect(DB_PATH)
c = conn.cursor()

# Add 'benefits' column if it doesn't exist
try:
    c.execute("ALTER TABLE job ADD COLUMN benefits TEXT;")
    print("Added 'benefits' column.")
except Exception as e:
    print("'benefits' column may already exist:", e)

# Add 'work_mode' column if it doesn't exist
try:
    c.execute("ALTER TABLE job ADD COLUMN work_mode VARCHAR(50);")
    print("Added 'work_mode' column.")
except Exception as e:
    print("'work_mode' column may already exist:", e)

conn.commit()
conn.close()
print("Migration complete.") 