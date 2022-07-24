const { Diets } = require('../db.js');

let diets = [
	{
		name: 'dairy free',
	},

	{
		name: 'gluten free',
	},
	{
		name: 'ketogenic',
	},
	{
		name: 'vegetarian',
	},
	{
		name: 'lacto-vegetarian',
	},
	{
		name: 'ovo-vegetarian',
	},
	{
		name: 'vegan',
	},
	{
		name: 'pescetarian',
	},
	{
		name: 'paleo',
	},
	{
		name: 'primal',
	},
	{
		name: 'low FODMAP'
	},
	{
		name: 'whole 30',
	},
];

async function getDiets(req, res, next) {
	
    try {
        let dietSearch = await Diets.findAll()
			if (dietSearch.length > 0) {
				return res.status(200).json(dietSearch);
			} else {
				let dietCreate =  await Diets.bulkCreate(diets)
						return res.status(200).json(dietCreate);
            }
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getDiets
}