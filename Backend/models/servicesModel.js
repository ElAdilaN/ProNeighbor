const sql = require("mssql");

const { poolPromise } = require("../config/db");

class Service {
  // Get all services with pagination
  static async getAllServices(page = 1, limit = 10) {
    const pool = await poolPromise; // Make sure you're getting the SQL pool connection

    if (limit === 0) {
      // If limit is 0, select all services without pagination
      const query = `
        SELECT * FROM services
        ORDER BY created_at DESC;
      `;
      const result = await pool.request().query(query);
      return result.recordset;
    } else {
      const offset = (page - 1) * limit;
      const query = `
        SELECT * FROM services
        ORDER BY created_at DESC
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
      `;

      // Pass parameters safely using .input()
      const result = await pool
        .request()
        .input("offset", sql.Int, offset) // Make sure sql.Int is being used correctly
        .input("limit", sql.Int, limit) // Make sure sql.Int is being used correctly
        .query(query);

      return result.recordset;
    }
  }

  // Get service by ID
  static async getServiceById(id) {
    const result = await sql.query`SELECT * FROM services WHERE id = ${id}`;
    return result.recordset[0];
  }

  // Create a new service
  static async createService(serviceData) {
    const { _id, _category, _name, _price, _description, _location } =
      serviceData;

    const pool = await poolPromise; // Get a connection from the pool

    try {
      // SQL query to insert a new service and return the inserted ID
      const result = await pool
        .request()
        .input("provider_id", sql.UniqueIdentifier, _id)
        .input("category_id", sql.VarChar, _category)
        .input("name", sql.NVarChar, _name)
        .input("price", sql.Decimal, _price)
        .input("description", sql.NVarChar, _description)
        .input("location", sql.NVarChar, _location).query(`
          INSERT INTO services (provider_id, category, name, price, description, location)
          VALUES (@provider_id, @category_id, @name, @price, @description, @location);
          SELECT SCOPE_IDENTITY() AS id;
        `);

      // Return the newly created service's ID
      return result.recordset[0];
    } catch (err) {
      throw new Error("Error creating service: " + err.message);
    }
  }

  // Update service
  static async updateService(id, serviceData) {
    const { name, price, description, location, category_id } = serviceData;

    // Get the SQL pool connection
    const pool = await poolPromise;

    try {
      // SQL query to update the service with UUIDs
      const result = await pool
        .request()
        .input("id", sql.UniqueIdentifier, id) // Use UniqueIdentifier for UUIDs
        .input("name", sql.NVarChar, name)
        .input("price", sql.Decimal, price)
        .input("description", sql.NVarChar, description)
        .input("location", sql.NVarChar, location)
        .input("category_id", sql.UniqueIdentifier, category_id) // Use UniqueIdentifier for UUIDs
        .query(`
          UPDATE services
          SET name = @name, price = @price, description = @description, location = @location, category = @category_id
          WHERE id = @id
        `);
      return result.rowsAffected[0]; // Return the number of affected rows
    } catch (err) {
      throw new Error("Error updating service: " + err.message);
    }
  }

  // Delete service
  static async deleteService(id) {
    try {
      const result = await sql.query`DELETE FROM services WHERE id = ${id}`;
      return result.rowsAffected[0];
    } catch (error) {
      console.error("Error deleting service:", error);
      throw new Error("Failed to delete service");
    }
  }
  // Get services by category
  static async getServicesByCategory(category_id) {
    const result =
      await sql.query`SELECT * FROM services WHERE category = ${category_id}`;
    return result.recordset;
  }

  // Search services by name, category, or location

  //join to add provider info
  static async searchServices(search) {
    try {
      const pool = await poolPromise;

      const result = await pool.request().input("search", sql.NVarChar, search)
        .query(`
        SELECT * FROM services
        WHERE name LIKE '%' + @search + '%' 
           OR description LIKE '%' + @search + '%' 
           OR location LIKE '%' + @search + '%'
      `);

      return result.recordset;
    } catch (err) {
      throw new Error("Error searching services: " + err.message);
    }
  }

  static async GetAllCategories() {
    try {
      const result = await sql.query`SELECT * FROM categories`;
      return result.recordset;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  }
}
module.exports = Service;
