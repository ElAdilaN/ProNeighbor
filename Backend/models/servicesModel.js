const sql = require("../config/db");

class Service {
  // Get all services with pagination
  static async getAllServices(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = `
      SELECT * FROM services
      ORDER BY created_at DESC
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
    `;
    const result = await sql.query`
      ${sql.raw(query)}
      , { offset: ${offset}, limit: ${limit} }
    `;
    return result.recordset;
  }

  // Get service by ID
  static async getServiceById(id) {
    const result = await sql.query`SELECT * FROM services WHERE id = ${id}`;
    return result.recordset[0];
  }

  // Create a new service
  static async createService(serviceData) {
    const { provider_id, category_id, name, price, description, location } =
      serviceData;
    const result = await sql.query`
      INSERT INTO services (provider_id, category_id, name, price, description, location)
      VALUES (${provider_id}, ${category_id}, ${name}, ${price}, ${description}, ${location});
      SELECT SCOPE_IDENTITY() AS id;
    `;
    return result.recordset[0];
  }

  // Update service
  static async updateService(id, serviceData) {
    const { name, price, description, location } = serviceData;
    const result = await sql.query`
      UPDATE services
      SET name = ${name}, price = ${price}, description = ${description}, location = ${location}
      WHERE id = ${id}
    `;
    return result.rowsAffected[0];
  }

  // Delete service
  static async deleteService(id) {
    const result = await sql.query`DELETE FROM services WHERE id = ${id}`;
    return result.rowsAffected[0];
  }

  // Get services by category
  static async getServicesByCategory(category_id) {
    const result =
      await sql.query`SELECT * FROM services WHERE category_id = ${category_id}`;
    return result.recordset;
  }

  // Search services by name, category, or location
  static async searchServices(search) {
    const query = `
      SELECT * FROM services
      WHERE name LIKE @search OR description LIKE @search OR location LIKE @search
    `;
    const result = await sql.query`
      ${sql.raw(query)}
      , { search: '%' + ${search} + '%' }
    `;
    return result.recordset;
  }
}

module.exports = Service;
