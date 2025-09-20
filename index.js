import pool from "./src/adaptere/postgres/adaptere.postgres.js";
import app from "./app.js";

const PORT = 4000;
pool
  .connect()
  .then(() => {
    console.log("✅ PostgreSQL connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at port: ${PORT}`);
    });
  })

  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL:", err.message);
    process.exit(1);
  });
