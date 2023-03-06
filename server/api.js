import { Router } from 'express';
import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipeRoutes.js'
const router = Router();

router.use('/users', userRoutes);

router.use('/recipes', recipeRoutes)

export default router;