const mongoose = require("mongoose");

// ----------------------------------------------------------------------

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
    });

    console.log("Database online");
  } catch (error) {
    console.log(error);
    throw new Error("Error while connecting to database");
  }
};

module.exports = {
  dbConnection,
};
