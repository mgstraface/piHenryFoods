const { Router } = require('express');

const router = Router();

const recipesRoutes = require('./recipes.js');
const dietsRoutes = require('./diets');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(recipesRoutes);
router.use(dietsRoutes)


module.exports = router;




