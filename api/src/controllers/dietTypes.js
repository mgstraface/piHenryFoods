const { DietTypes } = require('../db.js');

let diets = [
	{
		name: 'Gluten Free',
	},
	{
		name: 'Ketogenic',
	},
	{
		name: 'Vegetarian',
	},
	{
		name: 'Lacto-Vegetarian',
	},
	{
		name: 'Ovo-Vegetarian',
	},
	{
		name: 'Vegan',
	},
	{
		name: 'Pescetarian',
	},
	{
		name: 'Paleo',
	},
	{
		name: 'Primal',
	},
	{
		name: 'Low FODMAP'
	},
	{
		name: 'Whole30',
	},
];

async function getDiets(req, res, next) {
	
    try {
        let dietSearch = await DietTypes.findAll()
			if (dietSearch > 0) {
				return res.json(dietSearch).status(200);
			} else {
				let dietCreate = await DietTypes.bulkCreate(diets)
						return res.json(dietCreate).status(200);
            }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getDiets
}