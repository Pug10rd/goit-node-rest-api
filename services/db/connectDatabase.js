import sequelize from "./sequelize.js";

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.log(`Database connect failed ${error.message}`);
  }
};

export default connectDatabase;
