const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
sequelize.define(                        //asigno el nombre a la tabla
    "diets",
    {
    id: {
        type: DataTypes.UUID,            //asigno un ID unico a cada tipo de dieta
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
    },

    name: {                            //defino los names que pueden llegar (de la api o link)
        type: DataTypes.ENUM(
            'gluten free',
            'dairy free',
            'vegetarian',
            'lacto vegetarian',
            'ovo vegetarian',
            'lacto ovo vegetarian',
            'vegan',
            'paleolithic',
            'primal',
            'whole 30',
            'pescatarian',
            'ketogenic',
            'fodmap friendly',
            'low FODMAP'      
        ),
    },
    },
    {
    createdAt: false,
    updatedAt: false,
    }
);
};