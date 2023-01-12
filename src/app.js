import express from "express";
import { __express as pug } from "pug";
import { db } from "./db.js";

const port = 3000;
const app = express();

app.engine("pug", pug);

app.set("view engine", "pug");
app.set("views", "templates");
app.use(express.static("public"));

app.get("/api/videos", (req, res) => {
	try {
		const { query } = req.query;
		db.all(
			`SELECT name FROM videos WHERE name LIKE '%${query}%' AND hidden = 0`,
			(err, rows) => {
				if (err) {
					console.log(err);
					res.status(500).json({ error: "Internal server error" });
				} else {
					res.json(rows.map((row) => row.name));
				}
			}
		);
	} catch (e) {
		res.status(500).json({ error: "Internal server error" });
	}
});

app.get("/*", (req, res) => {
	res.render("index");
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
