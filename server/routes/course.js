import express from 'express';
import { getCourseData, getCoursesByDepartment, migrateApiData } from '../controllers/course';

const router = express.Router();

router.get('/migrate', migrateApiData);
router.get('/:id',getCourseData);
router.get('/dept/:dept', getCoursesByDepartment);

export default router;