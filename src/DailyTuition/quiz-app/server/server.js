import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { config } from "dotenv";
import router from "./routers/routes.js";
import connectDb from "./database/connection.js";

// Create web app
const app = express();

// Add middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Configure environment variables
config();

const port = process.env.SERVER_PORT || 5000;

// Configure routes
app.use('/api', router);

app.get('/', (req, res) => {
    try {
        res.json('Server connected!');
    } catch (error) {
        console.log(error);
    }
});

// Start the server only if we connect to database successful
connectDb().then(() => {
    try {
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    } catch (error) {
        console.log(`Cannot connect to the server. Details: ${error}`);
    }
}).catch(error => {
    console.log(`Cannot connect to MongoDB. Details: ${error}`);
});
