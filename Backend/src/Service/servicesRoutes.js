const express = require('express');
const router = express.Router();
const servicesController = require('./servicesController');
const { verifyToken } = require('../Auth/jwtUtils');

// Verify if neeed token
router.use(verifyToken);

// Create a new service
router.post('/', servicesController.createService);

// Get all services
router.get('/',servicesController.getAllService);

// Get a single service by ID
router.get("/:serviceid", servicesController.getServiceById);

// Update a service by ID
router.put('/:serviceid', servicesController.updateServiceById);

// Delete a service by ID
router.delete('/:serviceid', servicesController.deleteServiceById);

module.exports = router;