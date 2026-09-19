import "dotenv/config";

import app from "./app.js";


const PORT = process.env.PORT || 5000;


app.listen(PORT, "0.0.0.0", () => {
  console.log(`
-----------------------------------------
Raymond Gate Pass Management API
Server running on port ${PORT}
Environment: ${process.env.NODE_ENV}
-----------------------------------------
  `);
});