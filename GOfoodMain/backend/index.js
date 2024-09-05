const express = require('express');
const mongoDB = require("./db");
const app = express();
const port = process.env.PORT || 2002;
const cors = require('cors');



app.use(cors({origin:" http://localhost:5173"}))
app.use(express.json())
mongoDB();
app.get('/',(req,res)=>
{
    res.send("hello");
})

app.use("/api",require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use("/api",require("./Routes/Orderdata"));




app.listen(port,()=>
{
    console.log(`Example app listening on port ${port}`)
})