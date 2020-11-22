import express from 'express';
import { getCourseByName, getCourseData, getCoursesByDepartment, migrateApiData, orderCourses } from '../controllers/course';

const router = express.Router();

router.get('/migrate', migrateApiData);
router.get('/:id',getCourseData);
router.get('/dept/:dept', getCoursesByDepartment);
router.get('/name/:name', getCourseByName);
router.post('/order', orderCourses);

export default router;