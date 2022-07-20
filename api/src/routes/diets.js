const { Router } = require('express');
const router = Router();

const { getDiets } = require('../controllers/dietTypes');

router.get('/diets', getDiets);


module.exports = router;
