const mongoose = require("mongoose");

const connectDatabase = () => {
  console.log(process.env.DB_URI);
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Database connected :${data.connection.host}`);
    });
};

// removed the catch because the server will close when any unhandled there
module.exports = connectDatabase;
