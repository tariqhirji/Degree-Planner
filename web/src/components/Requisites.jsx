import React from 'react';

function Requisites(props){
    return(
        <div>
            {props.type==="preq"?<p>Prequisites: {props.courses}</p> : <p>Antirequisites: {props.courses}</p>}
        </div>
    )
}

export default Requisites;