//import express from "express";
const express = require("express");
//import path from "path";
const path = require("path");
//import fs from "fs/promises";
const fs = require("fs").promises;

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});







app.use("/", express.static(path.join(__dirname, "..", "frontend/allMovies/")));

app.get("/api/movies/all", async (req, res) => {
  try {
    const rawData = await fs.readFile("./data.json", "utf8");
    const data = JSON.parse(rawData);

    const allTitles = data.movies.map((movie) => { return movie.title})

    return res.send(allTitles);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/movies/title/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const rawData = await fs.readFile("./data.json", "utf8");
    const data = JSON.parse(rawData);
    const movie = data.movies.filter((movie) => {
      return movie.title === name;
    });
    return res.send(movie);
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/professionals/all', async (req, res) => {
  try {
    let result = [];

    const rawData = await fs.readFile("./data.json", "utf8");
    const data = JSON.parse(rawData);

    for (const movie of data.movies){
      
    }
    /* {
      name: {
        first: "",
        middle: "",
        last: ""
      },
      movies: [
        {
          title: "",
          roles: [""]
        }
      ]
    } */


    return res.send('kiscica');
  } catch (error) {
    console.log(error);
  }
})

app.listen(3000, () => {
  console.log(" http://localhost:3000");
});
