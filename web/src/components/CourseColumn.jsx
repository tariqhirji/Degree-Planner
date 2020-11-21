import React from 'react';
import { withRouter } from 'react-router-dom';
import './css/CourseColumn.css';

function CourseColumn(props){
    const courses = JSON.parse(props.courses);

    const handleClick = (id) => {
        props.history.push(`/course/${id}`);
    }

    return(
        <div className = 'col-3 course-col'>
            {courses.map(c =>
                <div key={c._id} className='course' onClick={() => handleClick(c._id)}>
                    {c.name}
                </div>    
            )}
        </div>
    )
}

export default withRouter(CourseColumn);