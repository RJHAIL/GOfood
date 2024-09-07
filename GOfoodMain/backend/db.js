const mongoose = require('mongoose');
const MongoDbURL = process.env.MONGO_URL;

const connectdb = async()=>
{

   try {
            
        await   mongoose.connect(MongoDbURL);
         console.log("connection is established");
         const db = mongoose.connection.db;
         const fetched_data = await db.collection("food_items").find({}).toArray();
         
        //console.log(fetched_data);
        global['food_items'] = fetched_data;

        const CategoryData = await db.collection("food_category").find({}).toArray();
        global['food_category'] = CategoryData;

      
         
        } catch (error) {
            console.error("database connection is failed ");
            process.exit(0);
        }

}

module.exports = connectdb;


