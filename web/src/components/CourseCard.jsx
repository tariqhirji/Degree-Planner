import React from 'react';
import './css/CourseCard.css';
import { Link } from 'react-router-dom';
function CourseCard(props) {
    return (
        <div className="CourseCard card">
            <div className="row justify-content-center align-items-center mx-0 w-100">
                <div className="col-2 theme">
                    <Link to={`/course/${props.course._id}`}><p>{props.course.code}</p></Link>
                </div>
                <div className="col-1">
                    <p className="text-muted">{props.course.cred}.0</p>
                </div>
                <div className="col-7">
                    <p className="py-2">{props.course.desc}</p>
                </div>
                <div className="col-2 theme">
                    <button className= "trash"onClick={() => props.handleRemove(props.course._id)}><i className="fas fa-trash"></i></button>
                </div>
            </div>
        </div>
    )
}

export default CourseCard;