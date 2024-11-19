import express from "express";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase-config.js";
import { Todo } from "./todo-schema.js";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const todosCollection = collection(db, "todos");

// Arrow Function
app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo(
      req.body.author,
      req.body.description,
      req.body.title,
    );

    await addDoc(todosCollection, JSON.parse(JSON.stringify(todo)));

    res.send("Document has been saved!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
