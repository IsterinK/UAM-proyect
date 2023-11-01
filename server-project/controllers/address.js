const express = require('express')
const router = express.Router()
const Address = require('../models/address')

router.post("/newaddress", async (req, res)=>{
    if(Object.keys(req.body).length === 0){
      console.log(req.body)
    }else{
      const address = new Address({
        country: req.body.country,
        department: req.body.department,
        state: req.body.state,
        nomclature: req.body.nomclature,
      })
      const saveAddress = await address.save()
      res.status(201).json(saveAddress)
    }
    
})

//GET all addresses

router.get("/", async (req, res)=>{
    const addresses = await Address.find();
    res.json(addresses)
})

router.get("/:addressId", async (req, res)=>{
    const addresses = await Address.findById(req.params.addressId);
    res.json(addresses)
})

//Delete
router.delete("/:addressId", async (req, res)=>{
    const removedAddress = await Address.findByIdAndDelete({ _id: req.params.addressId })
    res.json(removedAddress)
})


// UPDATE a specific address
router.patch("/:addressId", async (req, res) => {
    const updatedAddress = await Address.updateOne(
      { _id: req.params.addressId },
      {
        $set: {
          country: req.body.country,
          department: req.body.department,
          state: req.body.state,
          nomenclature: req.body.nomenclature,
        },
      }
    )
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  });

module.exports = router;