import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import auth from './middleware/auth.js';
import apiRoutes from "./api.js";
import {Database as db} from './util/db.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(auth);


// Use API route handler
app.use("/api/", apiRoutes);

await db.connect();

// Start server
app.listen(port, () => console.log(`Listening on port ${port}`));