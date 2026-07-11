const express=require("express");
const cors=require("cors");
require("dotenv").config();

const connectDB=require("./config/db");

connectDB();

const app=express();

app.use(cors());
app.use(express.json());


app.use("/api/tasks", require("./routes/taskRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/projects", require("./routes/projectRoutes"));


app.listen(
process.env.PORT,
()=>console.log(`Server running on ${process.env.PORT}`)
);