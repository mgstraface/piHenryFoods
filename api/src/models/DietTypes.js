const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
sequelize.define(
    "diets",
    {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },

    name: {
        type: DataTypes.ENUM(
        "dairy free",
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto-vegetarian",
        "ovo-vegetarian",
        "vegan",
        "pescetarian",
        "paleo",
        "primal",
        "low FODMAP",
        "whole 30"
        ),
    },
    },
    {
    createdAt: false,
    updatedAt: false,
    }
);
};