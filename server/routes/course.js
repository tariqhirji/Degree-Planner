import express from 'express';
import { getCoursesByDepartment, migrateApiData } from '../controllers/course';

const router = express.Router();

router.get('/migrate', migrateApiData);
router.get('/dept/:dept', getCoursesByDepartment);

export default router;