const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0, 0, { Order_date: req.body.order_date })


//     let eId = await Order.findOne({ 'email': req.body.email })
//     console.log(eId);

//     if (eId === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         }
//         catch (error) {
//             console.log(error.message)
//             res.send("server Error", error.message)
//         }
//     }

//     else {
//         try {
//             await Order.findOneAndUpdate({ email: req.body.email },
//                 { $push: { order_data: data } }).then(() => {
//                     res.status(200).send("success");
//                 })
//         }
//         catch (error) {
//             console.log(error.message)
//             res.send("server Error", error.message)
//         }
//     }

// });

router.post('/orderData', async (req, res) => {
    const { email, order_date, order_data } = req.body;

    const formattedOrder = {
        order_date: new Date(order_date), 
        items: order_data
    };

    try {
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            
            await Order.create({
                email,
                order_data: [formattedOrder]
            });
            res.json({ success: true });
        } else {
            // Append the new order to the existing order_data array
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data: formattedOrder } }
            );
            res.status(200).send("success");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

router.post("/myorderdata", async (req, res) => {
    try {
        let myData = await Order.findOne({ email: req.body.email });
        if (!myData) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.json({ orderData: myData.order_data });
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});



// router.post("/myorderdata", async(req,res)=>
// {
//     try {
//         let myData = await Order.findOne({email:req.body.email})
//         res.json({d:myData});
//     } catch (error) {
//         res.send("server Error", error.message);
//     }
// })



module.exports = router;