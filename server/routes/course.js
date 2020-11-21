import express from 'express';
import { migrateApiData } from '../controllers/course';

const router = express.Router();

router.get('/migrate', migrateApiData);

export default router;