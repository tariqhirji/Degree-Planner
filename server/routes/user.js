import express from 'express';
import { 
    changePassword,
    forgotPassword,
    getMe,
    login, 
    logout, 
    register,
    setAcademia,
    setCredentials, 
    addCourseToStudent,
    deleteCourseFromStudent,
    courseInList
} from '../controllers/user';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgot_password', forgotPassword);
router.post('/change_password', changePassword);
router.get('/me', getMe);
router.post('/academia', setAcademia);
router.post('/updateCredentials', setCredentials)
router.post('/addCourse', addCourseToStudent);
router.delete('/deleteCourse/:courseID', deleteCourseFromStudent);
router.get('/checkUserCourses', courseInList )

export default router;