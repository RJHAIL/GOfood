const express = require("express");
const router = express.Router();



router.post('/foodData',(req,res)=>
{
    try {
       // console.log(global['food-items']);
       res.send([
        global['food_items'],   // response[0]
        global['food_category'] // response[1]
    ]

    );
} 
    catch (error) {
        console.error(error.message);
        res.send("Server Error!")
    }
});

// router.post("/foodcategory",(req,res)=>
// {
//     try{
//         //console.log(global['food-category']);
//         res.send({
//             'food-category': global['food-category']
//         });

//     } 
//     catch (error) {
//         console.error(error.message)
        
//     }
// });

module.exports = router;