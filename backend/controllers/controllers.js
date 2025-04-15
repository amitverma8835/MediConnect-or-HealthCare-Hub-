const express = require('express');
const router = express.Router();
const Doctor = require('../models/Schema'); 


exports.addDoctor =  async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add doctor', details: error.message });
  }
};

exports.getDoctor =  async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors', details: error.message });
  }
};


exports.getDoctorById = async (req, res) => {
  try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) {
          return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(doctor);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateDoctor =  async (req, res) => {
  try {
      const { name, passion, age, charge, desc } = req.body;
      const updatedDoctor = await Doctor.findByIdAndUpdate(
          req.params.id,
          { name, passion, age, charge, desc },
          { new: true }
      );
      if (!updatedDoctor) {
          return res.status(404).json({ message: 'Doctor not found' });
      }
      res.json(updatedDoctor);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteDoctor = async (req, res) => {
  try {
      const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!deletedDoctor) {
          return res.status(404).json({ success: false, message: 'Doctor not found' });
      }
      res.json({ 
          success: true,
          message: 'Doctor deleted successfully',
          data: deletedDoctor
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ 
          success: false,
          message: 'Server Error',
          error: err.message 
      });
  }
};