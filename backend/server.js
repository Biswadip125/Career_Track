import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

const PORT = env.port || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
