const db = require("../DbConnections/db");

const servicesController = {
  // Create a new service
  createService: async (req, res) => {
    try {
      const {
        service_name,
        service_price,
        service_description,
        service_image,
        status,
      } = req.body;

      // Validate required fields
      if (
        !service_name ||
        !service_price ||
        !service_description ||
        !service_image ||
        !status
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      // Create new service in the database
      const newService = await db.query(
        `INSERT INTO Services 
                (service_name, service_price, service_description, service_image, status) 
                VALUES ($1, $2, $3, $4, $5) 
                RETURNING *`,
        [
          service_name,
          service_price,
          service_description,
          service_image,
          status,
        ]
      );

      res.status(201).json({
        success: true,
        message: "Service ceated successfully",
        service: newService.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to create service",
        error: error.message,
      });
    }
  },

  // Get all services
  getAllService: async (req, res) => {
    try {
      const services = await db.query("SELECT * FROM Services");
      res.status(200).json(services.rows);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get services",
        error: error.message,
      });
    }
  },

  // Get a service by ID
  getServiceById: async (req, res) => {
    try {
      const { serviceid } = req.params;
      const servicesbyid = await db.query(
        "SELECT * FROM Services WHERE serviceid = $1",
        [serviceid]
      );
      res.status(201).json({
        success: true,
        message: "Service fetched successfully",
        service: servicesbyid.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get service by ID",
        error: error.message,
      });
    }
  },

  // Update a service by ID
  updateServiceById: async (req, res) => {
    try {
      const { serviceid } = req.params;
      const {
        service_name,
        service_price,
        service_description,
        service_image,
        status,
      } = req.body;
      // Validate required fields
      if (
        !service_name ||
        !service_price ||
        !service_description ||
        !service_image ||
        !status
      ) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Update service in the database
      const updateservice = await db.query(
        `UPDATE service SET service_name = $1, service_price = $2, service_description = $3, service_image = $4, status = $5 WHERE serviceid = $6 RETURNING *`,
        [
          service_name,
          service_price,
          service_description,
          service_image,
          status,
          serviceid,
        ]
      );

      res.status(201).json({
        success: true,
        message: "Service updated successfully",
        service: updateservice.rows[0],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update service by ID",
        error: error.message,
      });
    }
  },

  // Delete a service by ID
  deleteServiceById: async (req, res) => {
    try {
      const { serviceid } = req.params;
      // Delete service from the database
      const deleteservice = await db.query(
        "DELETE FROM Services WHERE serviceid = $1",
        [serviceid]
      );
      res.status(200).json({
        success: true,
        message: "Service deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete service by ID",
        error: error.message,
      });
    }
  },
};

module.exports = servicesController;