import { Router } from 'express';
import { handleRequestCreation } from '../controllers/createRequestController';

const router = Router();

router.post('/create', handleRequestCreation)

export default router;