import express from "express";
import router from './router/router.js';
import connectDB from'./database/connectdb.js'
import cors from 'cors';
const app = express();
   
app.use(cors(), express.json());
const PORT = 8080;
            
app.use('/api', router);

connectDB().then(()=>{
  app.listen(PORT,()=>{
      console.log("Server is running")
  })       
})
