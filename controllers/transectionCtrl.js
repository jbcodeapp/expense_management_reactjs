const transectionModel = require('../models/transectionModel')

const getAllTransection = async(req,res) => {
    try{
        console.log("User ID:", req.body.userId);
        const transections = await transectionModel.find({userId: req.body.userId})

        res.status(200).json(transections)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"});
    }
}

const addTransection = async(req,res) => {
    try{
        const newTransection = new transectionModel(req.body)
        await newTransection.save()
        res.status(201).send('Transection Created')
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
    // try {
    //     req.body.userId = "65d31c2d340d07ccf01ec67e"; // Replace this with the actual logged user's ID
    //     const newTransaction = new transectionModel(req.body);
    //     await newTransaction.save();
    //     res.status(201).send('Transaction Created');
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ error: "Internal Server Error" });
    // }
}

module.exports = { getAllTransection, addTransection }
