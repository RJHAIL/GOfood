const mongoose = require('mongoose');
const MongoDbURL = "mongodb://localhost:27017/GoFood"

const connectdb = async()=>
{

   try {
            
        await   mongoose.connect(MongoDbURL);
         console.log("connection is established");
         const db = mongoose.connection.db;
         const fetched_data = await db.collection("food-items").find({}).toArray();
         
        //console.log(fetched_data);
        global['food-items'] = fetched_data;

        const CategoryData = await db.collection("food-category").find({}).toArray();
        global['food-category'] = CategoryData;

      
         
        } catch (error) {
            console.error("database connection is failed ");
            process.exit(0);
        }

}

module.exports = connectdb;


