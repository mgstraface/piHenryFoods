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
			if (dietSearch.length > 0) {
				return res.status(200).json(dietSearch);
			} else {
				let dietCreate =  await DietTypes.bulkCreate(diets)
						return res.status(200).json(dietCreate);
            }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getDiets
}