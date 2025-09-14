import express from "express";
import userRoutes from "./routes/userRoutes.js";
const app = express();
app.use(express.json()); // parse JSON body
// Routes use kar raha ho ma
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

