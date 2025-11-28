import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  username: "db_contacts_b93e_user",
  password: "IL4tUGQ72KZmEb4BJ7ZO79bjHFWFY4qa",
  host: "dpg-d4kp33gdl3ps73fjndg0-a.oregon-postgres.render.com",
  database: "db_contacts_b93e",
  port: 5432,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
