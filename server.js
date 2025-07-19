const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const inventoryRoute = require("./routes/inventoryRoute");
const accountRoute = require("./routes/accountRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const PORT = process.env.PORT;

app
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())
  .use("/inv", inventoryRoute)
  .use("/account", accountRoute);

app.listen(PORT, () => {
  console.log(`Web service is listening on port: ${PORT}.`);
});
