const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Anslut mongoDB

mongoose.connect(process.env.DB_URL).then(() => {
    console.log(`Connected to MongoDB`)

    app.listen(port, () => {
    console.log(`Server running on ${port}`)
    console.log(process.env.DB_URL)
})
}).catch((error) => {
    console.error(`Error connecting. ${error}`)
})

//Scheman för MongoDB
const workSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Företag saknas. Vid sekretessavtal kan du skriva 'NDA'"],
    },
    jobtitle: {
        type: String,
        required: [true, "Roll saknas."],
    },
    joblocation: {
        type: String,
        required: false,
    },
    workinghours: {
        type: String,
        required: [true, "Ange anställningsgrad"],
    },
    workfromwhere: {
        type: String,
        required: [true, "Ange från vart du arbetar/de"]
    },
    description: {
        type: String,
        required: false
    }
});

const work = mongoose.model("workexperience", workSchema);

app.get("/api", async (req, res) => {
    res.json({ message: "API NÅDD" });
});

app.get("/api/workexperience", async (req, res) => {
    try {
        let result = await work.find({});
        console.log(result)
        return res.json(result)
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message: err.message})
    }
})

app.get("/api/workexperience/:id", async (req, res) => {

    let id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Felaktigt format på ID" });
    }
    try {
        let result = await work.findById({ "_id": id })

        return res.json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
});

app.post("/api/workexperience", async (req, res) => {

    let company = req.body.company;
    let jobtitle = req.body.jobtitle;
    let joblocation = req.body.joblocation;
    let workinghours = req.body.workinghours;
    let workfromwhere = req.body.workfromwhere;
    let description = req.body.description;

    let errors = {
        message: "",
        details: "",
        https_response: {

        }
    };

    if (!company || !jobtitle || !workinghours || !workfromwhere) {

        errors.message = "Fält saknar information";
        errors.details = "Vänligen fyll fälten med information"

        errors.https_response.message = "Bad Request";
        errors.https_response.code = 400

        return res.status(400).json(errors)
    }

    if (!errors.message) {
        try {
            let result = await work.create(req.body);

            return res.status(201).json({ message: `Arbetserfarenhet tillagd`});
        } catch (err) {
            return res.status(400).json(err)
        }
    }


})

app.put("/api/workexperience/:id", async (req, res) => {

    let company = req.body.company;
    let jobtitle = req.body.jobtitle;
    let joblocation = req.body.joblocation;
    let workinghours = req.body.workinghours;
    let workfromwhere = req.body.workfromwhere;
    let description = req.body.description;
    let id = req.params.id
    try {
        let result = await work.updateOne({"_id": id },
            { $set:
            { company: company,
              jobtitle: jobtitle,
              joblocation: joblocation,
              workinghours: workinghours,
              workfromwhere: workfromwhere,
              description: description
             }
            }
        )

        return res.status(201).json({ message: `Arbetserfarenhet uppdaterad`})
    } catch (err) {
        return res.status(400).json(err)
    }
})

app.delete("/api/workexperience/:id", async (req, res) => {
    const id = req.params.id

    try {
        let result = await work.deleteOne({"_id": id})
        return res.status(200).json(`Arbete borttaget`)
    } catch (err) {
        return res.status(500).json(err)
    }
    
})

