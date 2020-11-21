import express from 'express';
import { generateDepartments } from '../controllers/department';

const router = express.Router();

router.get('/generate', generateDepartments);

export default router;