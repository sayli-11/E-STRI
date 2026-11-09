require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const Booking = require('./bookingModel');
const Vendor = require('./vendorModel');

const MLR = require('ml-regression-multivariate-linear');
const trainingData = require('./ai/training-data');

const app = express();
const PORT = 5000;


// ================= AI MODEL =================

const X = trainingData.map(row => [
    row[0],
    row[1],
    row[2]
]);

const Y = trainingData.map(row => [
    row[3]
]);

const priceModel = new MLR(X, Y);

console.log("AI Price Prediction Model Trained Successfully!");

// =============================================


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));


mongoose.connect('mongodb://127.0.0.1:27017/estriDB')
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


app.get("/addvendors", async (req,res)=>{

    await Vendor.deleteMany({});

    await Vendor.insertMany([
        { name:"Ramesh Presswala", price:"₹6", rating:4.5, area:"Lower Parel", serviceType:"ironing" },
        { name:"Salim Iron Center", price:"₹7", rating:4.2, area:"Currey Road", serviceType:"dryclean" },
        { name:"Ganesh Laundry", price:"₹8", rating:4.7, area:"Dadar", serviceType:"laundry" },
        { name:"Shiv Iron Works", price:"₹5", rating:4.1, area:"Byculla", serviceType:"curtain" },
        { name:"Shoe Care Pro", price:"₹50", rating:4.3, area:"Parel", serviceType:"shoe" }
    ]);

    res.send("Vendors Added Successfully");
});


app.get("/api/vendors", async (req,res)=>{

    const vendors = await Vendor.find();

    res.json(vendors);
});


app.post("/api/book", async (req,res)=>{

    console.log("Incoming Data:", req.body);

    try{

        const booking = new Booking(req.body);

        await booking.save();

        res.json({
            message:"Booking Done"
        });

    }catch(err){

        console.log("ERROR:", err);

        res.status(500).json({
            message:"Error saving booking"
        });
    }
});


// ================= AI PRICE PREDICTION API =================

app.post("/api/ai/predict-price", (req, res) => {

    try {

        const {
            numberOfClothes,
            service,
            urgency
        } = req.body;

        const serviceCodes = {
            ironing: 1,
            dryclean: 2,
            laundry: 3,
            curtain: 4,
            shoe: 5
        };

        const serviceCode =
            serviceCodes[service.toLowerCase()];

        const urgencyCode =
            urgency.toLowerCase() === "urgent" ? 1 : 0;

        if (!numberOfClothes || !serviceCode) {

            return res.status(400).json({
                success: false,
                message: "Invalid input"
            });
        }

        const prediction = priceModel.predict([
            [
                Number(numberOfClothes),
                serviceCode,
                urgencyCode
            ]
        ]);

        let predictedPrice = prediction[0][0];

        predictedPrice = Math.round(predictedPrice);

        if (predictedPrice < 0) {
            predictedPrice = 0;
        }

        res.json({

            success: true,

            predictedPrice: predictedPrice,

            message: "Price predicted using trained ML model"

        });

    } catch (error) {

        console.log("AI Prediction Error:", error);

        res.status(500).json({

            success: false,

            message: "AI prediction failed"

        });
    }
});


// =========================================================

// ================= GEMINI AI CHATBOT =================
console.log("GEMINI CHAT ROUTE LOADED");
app.post("/api/ai/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        if (!userMessage) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const prompt = `
You are the official AI assistant of E-STRI, a digital platform
that connects customers with local ironing and cleaning vendors.

Your job is to help users with:
- Ironing
- Laundry
- Dry cleaning
- Shoe cleaning
- Curtain cleaning
- Vendor information
- Booking guidance
- Pickup and delivery information
- General questions about using E-STRI

Important rules:
1. Answer in simple English.
2. Keep answers short and helpful.
3. Do not invent vendor names, prices or bookings.
4. If the user asks about something unrelated to E-STRI, politely say that you are the E-STRI assistant and can mainly help with E-STRI services.
5. Never claim that you completed a booking unless the website actually confirms it.

User question:
${userMessage}
`;

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.log("Gemini API Error:", data);

            return res.status(500).json({
                success: false,
                message: "Gemini API request failed"
            });
        }

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I could not generate a response.";

        res.json({
            success: true,
            reply: reply
        });

    } catch (error) {
        console.log("Gemini Chatbot Error:", error);

        res.status(500).json({
            success: false,
            message: "AI chatbot error"
        });
    }
});
app.listen(PORT, ()=>{

    console.log(
        "Server running on http://localhost:5000"
    );

});