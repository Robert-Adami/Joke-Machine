import express from "express";
import axios from "axios";

//Initialize app

const app = express();
const port = 3000;
//Public folder for static files 
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Middleware na parsovanie dát 
//GET a twopart joke and send it to ejs file
app.get("/", async (req, res) => {
    const API_URL = "https://v2.jokeapi.dev/joke/Programming?type=twopart";
    try {
    const response = await axios.get(API_URL);
    const {setup, delivery} = response.data;
    res.render("index.ejs", { setup, delivery, joke:null });
    } catch (error) {
    console.log(error.response);
    console.error(error.response);
    res.status(500).send("Error fetching joke");
    }
})

//GET a joke based on users choice
app.post("/get-joke", async (req, res) => {
    const jokeType = req.body.jokeType;
    const API_URL = `https://v2.jokeapi.dev/joke/${jokeType}?type=twopart`;
    try {
        const response = await axios.get(API_URL);
        const {setup, delivery} = response.data;
        const joke = `${setup} ${delivery}`;
        res.render("index.ejs", { setup, delivery, joke });
    } catch (error) {
        console.error(error.response);
        res.status(500).send("Error fetching joke");
    }
})
//Listen for port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

//kostru mám treba to otestovať v terminály ale to musím najsť v poznámkach ako lognuť do terminálu resp spustiť kod a ešte html kostru plus štýlovanie