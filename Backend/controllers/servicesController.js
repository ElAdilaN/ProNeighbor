const Service = require("../models/servicesModel");

// Get all services with pagination
exports.getAllServices = async (req, res) => {
  try {
    // Extract page and limit from query params, default to 1 and 10 respectively
    const { page = 1, limit = 10 } = req.query;

    // Ensure limit is a valid number, otherwise fallback to 10
    const parsedLimit =
      limit === "0" ? 0 : Math.min(Math.max(Number(limit), 1), 100); // Limit between 1 and 100
    const parsedPage = Math.max(Number(page), 1); // Ensure page is at least 1

    // Fetch services using the modified method
    const services = await Service.getAllServices(parsedPage, parsedLimit);

    // Return response
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
    // Destructure data from the request body
    const { provider_id, category_id, name, price, description, location } =
      req.body;

    // Validate that all required fields are provided
    if (
      !provider_id ||
      !category_id ||
      !name ||
      !price ||
      !description ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (provider_id, category_id, name, price, description, location) are required",
      });
    }

    // Validate price to be a positive number
    if (isNaN(price) || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a valid positive number",
      });
    }

    // Pass validated data to the model for insertion into the database
    const newService = await Service.createService({
      provider_id,
      category_id,
      name,
      price,
      description,
      location,
    });

    // Return success response
    res
      .status(201)
      .json({ success: true, message: "Service created", id: newService.id });
  } catch (err) {
    console.error(err); // For debugging purposes
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    // Extract values from the request body
    const { name, price, description, location, category_id } = req.body;
    const { id } = req.params; // The service ID from the URL (which is a UUID)

    // Validate that all required fields are provided
    if (!name || !price || !description || !location || !category_id) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (name, price, description, location, category_id) are required",
      });
    }

    // Ensure the ID is a valid UUID format (simple check)
    if (!isValidUUID(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID format",
      });
    }

    // Validate the category_id is also a valid UUID
    if (!isValidUUID(category_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format",
      });
    }

    // Pass the values directly to the model for updating
    const updated = await Service.updateService(id, {
      name,
      price,
      description,
      location,
      category_id,
    });

    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found or no changes made",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Helper function to validate UUID format (basic check)
function isValidUUID(uuid) {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regex.test(uuid);
}

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
    let { search } = req.query;

    search = search ? `%${search}%` : "%"; // If no search term, return all

    const services = await Service.searchServices(search);

    res.status(200).json({ success: true, services });
  } catch (err) {
    console.error("Search Services Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
