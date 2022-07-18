const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
        primaryKey: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      healtScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      analyzedInstructions: {
        //paso a paso
        type: DataTypes.TEXT,
        allowNull: true,
      },

      recipeScore: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
};
