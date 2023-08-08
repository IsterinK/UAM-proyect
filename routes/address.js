const express = require('express');
const router = express.Router();
const Address = require("../models/address")

router.post("/new-address", async (req, res)=>{
    const address = new Address({
        country: req.body.country,
        department: req.body.department,
        state: req.body.state,
        nomclature: req.body.nomclature,
    })
    const saveAddress = await address.save()
    res.json(saveAddress)
})


//GET all addresses

router.get("/", async (req, res)=>{
    const adresses = await Address.find();
    res.json(addresses)
})

module.exports = router;