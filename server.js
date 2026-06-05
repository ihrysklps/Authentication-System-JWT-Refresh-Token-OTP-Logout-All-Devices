// this file is responsible for starting the server and fetching the data from the database

import app from "./src/app.js"; // importing app.js as server is created there itself
import connectDB from "./src/config/connect.js";

connectDB();

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

