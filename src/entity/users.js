var entitySchema = require("typeorm").EntitySchema;
module.exports = new entitySchema({
  name: "users",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    userId: {
      type: "int",
    },
    password: {
      type: "varchar",
    },
    lastLogin: {
      type: "timestamp",
      default: null,
    },
    active: {
      type: "boolean",
    },
    updatedAt: {
      type: "timestamp",
      default: null,
    },
    updatedBy: {
      type: "varchar",
      default: null,
    },
  },
});
