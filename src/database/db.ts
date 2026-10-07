import * as SQLite from 'expo-sqlite';

// Initialize the database
const db = SQLite.openDatabaseSync('taghvim.db');

export const initDB = () => {
  try {
    // Create Tasks table
    db.execSync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT, -- 'financial', 'work', 'personal'
        date TEXT NOT NULL, -- format: 'YYYY-MM-DD' (Jalali)
        is_completed INTEGER DEFAULT 0,
        color_dot TEXT DEFAULT '#4ade80' -- green by default
      );
    `);

    // Create Shifts table
    db.execSync(`
      CREATE TABLE IF NOT EXISTS shifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL UNIQUE, -- format: 'YYYY-MM-DD' (Jalali)
        shift_type TEXT NOT NULL -- 'صبح', 'عصر', 'شب', 'آف'
      );
    `);

    // Create Notes table
    db.execSync(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);

    console.log("Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database: ", error);
  }
};

// Example Helper functions
export const getTasksForDate = (date: string) => {
  return db.getAllSync('SELECT * FROM tasks WHERE date = ?', [date]);
};

export const addTask = (title: string, category: string, date: string, color: string) => {
  return db.runSync(
    'INSERT INTO tasks (title, category, date, color_dot) VALUES (?, ?, ?, ?)',
    [title, category, date, color]
  );
};

export const getShiftForDate = (date: string) => {
  const result = db.getFirstSync<{ shift_type: string }>('SELECT shift_type FROM shifts WHERE date = ?', [date]);
  return result?.shift_type || null;
};

export const setShiftForDate = (date: string, shift_type: string) => {
  return db.runSync(
    'INSERT OR REPLACE INTO shifts (date, shift_type) VALUES (?, ?)',
    [date, shift_type]
  );
};

export default db;
