import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "seatudy data"
});

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const checkQuery = "SELECT * FROM `user data` WHERE `username` = ?";
    db.query(checkQuery, [req.body.username], (err, data) => {
        if(err) {
            console.error("Error checking user: ", err);
            return res.json("Error checking user: ", err);
        }
        if(data.length > 0) {
            return res.json("User already exists.");
        }
        
        const q = "INSERT INTO `user data` (`username`, `password`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.password,
        ];
        db.query(q, [values], (err, data) => {
            if(err) {
                console.error("Error registering user: ", err);
                return res.json("There is an error: " + err);
            };
            return res.json("New user added.");
        });
    });
});

app.post("/login", (req, res) => {
    const q = "SELECT * FROM `user data` WHERE `username` = ? AND `password` = ?";
    db.query(q, [req.body.username, req.body.password], (err, data) => {
        if(err) return res.json("There is an error: " + err);
        if(data.length === 0) return res.json("There is an error: " + err);
        if(data[0].username !== req.body.username && data[0].password !== req.body.password)
            return res.json("There is an error: " + err);

        return res.json("Login successful.");
    });
});

app.get("/dashboard", (req, res) => {
    const q = "SELECT * FROM `course data`";
    db.query(q, (err, data) => {
        if(err) return res.json("There is an error: " + err)
            return res.json(data);
    });
});

app.get("/my-course", (req, res) => {
    const user = req.query.user;
    const q = "SELECT * FROM `user course` WHERE `user` = ?";
    db.query(q, [user], (err, data) => {
        if(err) return res.json("There is an error: " + err)
            return res.json(data);
    });
});

app.post("/dashboard", (req, res) => {
    const q = "INSERT INTO `user course` (`user`, `courseId`, `title`, `desc`, `cover`, `price`) VALUES (?)"
    const values = [
        req.body.user,
        req.body.courseId,
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    db.query(q, [values], (err, data) => {
        if(err) return res.json("There is an error: " + err)
            return res.json("New course added.");
    });
});

app.delete("/my-course/:id", (req, res) => {
    const courseId = req.params.id;
    const user = req.query.user;

    const q = "DELETE FROM `user course` WHERE `courseId` = ? AND `user` = ?";
    db.query(q, [courseId, user], (err, data) => {
        if(err) return res.json("There is an error: " + err)
            return res.json("Course has been deleted.");
    });
});

app.listen(8800, () => {
    console.log("Server is running on port 8800.");
    });