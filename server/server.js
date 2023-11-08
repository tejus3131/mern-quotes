import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
// import cors from "cors";
import { configDotenv } from "dotenv";
import { fileURLToPath } from 'url';
import path from 'path';

configDotenv();

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URI);

const QuoteSchema = mongoose.Schema({
    quote: {
        type: String,
        required: true,
    },
});

const Quotes = mongoose.model('Quotes', QuoteSchema);

const server = express();

server.use(morgan("dev"));
// server.use(cors());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.static(path.join(__dirname, '../client/dist')));

server.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

server.use(express.json())

server.get("/quotes", async (req, res) => {
    try {
        const quotes = await Quotes.find();
        res.json(quotes);
    } catch (err) {
        res.json({ message: err });
    }
});

server.post("/quotes", async (req, res) => {
    const quote = new Quotes({
        quote: req.body.quote,
    });
    try {
        const savedQuote = await quote.save();
        res.json(savedQuote);
    } catch (err) {
        res.json({ message: err });
    }
});

server.get("/quotes/:id", async (req, res) => {
    try {
        const quote = await Quotes.findById(req.params.id);
        res.json(quote);
    } catch (err) {
        res.json({ message: err });
    }
});

server.delete("/quotes/:id", async (req, res) => {
    try {
        const removedQuote = await Quotes.deleteOne({ _id: req.params.id });
        res.json(removedQuote);
    } catch (err) {
        res.json({ message: err });
    }
});

server.patch("/quotes/:id", async (req, res) => {
    try {
        const updatedQuote = await Quotes.updateOne(
            { _id: req.params.id },
            { $set: { quote: req.body.quote } }
        );
        res.json(updatedQuote);
    } catch (err) {
        res.json({ message: err });
    }
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
