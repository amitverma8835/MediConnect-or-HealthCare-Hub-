const express = require("express");
const router = express.Router();

const { addDoctor,getDoctor, getDoctorById,updateDoctor,deleteDoctor} = require('../controllers/controllers')

router.post('/add-doctor',addDoctor)
router.get('/doctors',getDoctor)
router.get('/doctors/:id', getDoctorById);
router.put('/update-doctor/:id', updateDoctor);
router.delete('/doctors/:id', deleteDoctor);
module.exports = router;


