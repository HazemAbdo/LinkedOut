const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config = require("dotenv");
const v1UsersRouter = require("./routes/users");
const v1ConnectionsRouter = require("./routes/connections");
const v1PostsRouter = require("./routes/posts");
const v1CommentsRouter = require("./routes/comments");
const v1PasswordResetRouter = require("./routes/passwordReset");
const { default: mongoose } = require("mongoose");

config.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  process.env.DB_URI,
  {
    dbName: "linkedout",
  },
  () => {
    console.log("Connected to database Successfully");
  }
);

app.use("/api/v1/users", v1UsersRouter);
app.use("/api/v1/reset-password", v1PasswordResetRouter);
app.use("/api/v1/connections", v1ConnectionsRouter);
app.use("/api/v1/posts", v1PostsRouter);
app.use("/api/v1/comments", v1CommentsRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});

process.on("SIGINT", () =>
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  })
);

process.on("SIGKILL", () =>
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  })
);
