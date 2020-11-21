import express from 'express';
import { migrateApiData,getCourseData} from '../controllers/course';

const router = express.Router();

router.get('/migrate', migrateApiData);
router.get('/:id',getCourseData);
export default router;