import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';

dotenv.config()
const app = express();

const port = process.env.PORT || 8000;
app.listen(port , () =>{
    console.log('Service is running on port', port);
})