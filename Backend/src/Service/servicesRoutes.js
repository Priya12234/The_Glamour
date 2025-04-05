const express = require('express');
const router = express.Router();
const servicesController = require('./servicesController');
const { verifyToken } = require('../Auth/jwtUtils');


router.get('/',servicesController.getAllService);

// Verify if neeed token
router.use(verifyToken);

// Create a new services
router.post('/', servicesController.createService);

// Get all services

// Get a single service by ID
router.get("/:serviceid", servicesController.getServiceById);

// Update a service by ID
router.put('/:serviceid', servicesController.updateServiceById);

// Delete a service by ID
router.delete('/:serviceid', servicesController.deleteServiceById);

module.exports = router;