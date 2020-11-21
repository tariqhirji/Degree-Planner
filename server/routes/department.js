import express from 'express';
import { getAllDepartments, generateDepartments } from '../controllers/department';

const router = express.Router();

router.get('/', getAllDepartments);
router.get('/generate', generateDepartments);

export default router;