const Service = require("../models/servicesModel");

// Get all services with pagination
exports.getAllServices = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const services = await Service.getAllServices(page, limit);
    res.status(200).json({ success: true, services });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.getServiceById(req.params.id);
    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, service });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Create a new service
exports.createService = async (req, res) => {
  try {
    const newService = await Service.createService(req.body);
    res
      .status(201)
      .json({ success: true, message: "Service created", id: newService.id });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const updated = await Service.updateService(req.params.id, req.body);
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, message: "Service updated" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.deleteService(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, message: "Service deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Get services by category
exports.getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.getServicesByCategory(
      req.params.category_id
    );
    res.status(200).json({ success: true, services });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Search services
exports.searchServices = async (req, res) => {
  try {
    const { search } = req.query;
    const services = await Service.searchServices(search);
    res.status(200).json({ success: true, services });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
