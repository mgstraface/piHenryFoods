const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
sequelize.define(
    "dietTypes",
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },

    name: {
        type: DataTypes.ENUM(
        "Gluten Free",
        "Ketogenic",
        "Vegetarian",
        "Lacto-Vegetarian",
        "Ovo-Vegetarian",
        "Vegan",
        "Pescetarian",
        "Paleo",
        "Primal",
        "Low FODMAP",
        "Whole30"
        ),
    },
    },
    {
    createdAt: false,
    updatedAt: false,
    }
);
};