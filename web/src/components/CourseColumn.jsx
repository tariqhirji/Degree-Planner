import React from 'react';
import './css/CourseColumn.css';

function CourseColumn(props){
    const courses = JSON.parse(props.courses);

    return(
        <div className = 'col-3 course-col'>
            {courses.map(c =>
                <div key={c._id} className='course'>
                    {c.name}
                </div>    
            )}
        </div>
    )
}

export default CourseColumn;