import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Cards from "./dbCards.js";
import Cors from "cors";

// App config

const app = express();
const port = process.env.PORT || 8001;
dotenv.config();

const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ho2e6.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Middlewares

app.use(express.json());
app.use(Cors());

// DB config

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// API endpoints

app.get("/", (req, res) => res.status(200).send("yarrak varmis gibi"));

app.post("/kinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/kinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener

app.listen(port, () => console.log(`listening on localhost: ${port} `));
