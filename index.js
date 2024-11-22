import express from "express";
import axios from "axios";

//Initialize app

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Programming?type=twopart";

//Public folder for static files 
app.use(express.static("public"));

//GET a twopart joke and send it to ejs file
app.get("/", async (req, res) => {
    try {
    const response = await axios.get(API_URL);
    res.render("index.ejs", { setup: JSON.stringify(response.data.setup), delivery: JSON.stringify(response.data.delivery)  });
    } catch (error) {
    console.log(error.response);
    res.status(500);
    }
})
//Listen for port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

//kostru mám treba to otestovať v terminály ale to musím najsť v poznámkach ako lognuť do terminálu resp spustiť kod a ešte html kostru plus štýlovanie