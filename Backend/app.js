const express = require("express");
const testRoutes = require("./routes/test"); // New query routes
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/api/test", testRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
