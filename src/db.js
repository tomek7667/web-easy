import sqlite3 from "sqlite3";
import { flag } from "./flag.js";

export const db = new sqlite3.Database("db.sqlite");

db.serialize(() => {
	db.run("DROP TABLE IF EXISTS videos");
	db.run(
		"CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, hidden INTEGER DEFAULT 0)"
	);
	db.run(
		"INSERT INTO videos (name) VALUES ('Rick Astley - Never Gonna Give You Up (Official Music Video)')"
	);
	db.run(
		`INSERT INTO videos (name) VALUES ('Ive been Hacking for 10 Years! (Stripe CTF Speedrun)')`
	);
	db.run(`INSERT INTO videos (name, hidden) VALUES ('${flag}', 1)`);
});
