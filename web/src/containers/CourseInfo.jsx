import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import { getCourseById, getCourseByName } from '../routes/courseRoutes';
import {addCourse, removeCourse} from '../routes/userRoutes';
import Sidebar from '../components/Sidebar';
import Requisites from '../components/Requisites';
import './css/CourseInfo.css'

class CourseInfo extends Component{
    constructor(){
        super();
        this.state={
            name: '',
            cred: '',
            creq: [],
            dept: '',
            desc: '',
            link: '',
            preq: []
        };

        this.getCourseData = this.getCourseData.bind(this);
        this.buildRequisites = this.buildRequisites.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

   async  componentDidMount(){
        const { id } = this.props.match.params;    

        const course = await this.getCourseData(id);
     
        this.setState({...course});
    }

    async componentDidUpdate(prevProps){
        const { id } = this.props.match.params;    

        if(id !== prevProps.match.params.id){
            const course = await this.getCourseData(id);
            this.setState({...course});
        }
    }

    async getCourseData(id){
        const course = await getCourseById(id);
        const { preq, creq } = course;
    
        course.preq = await this.buildRequisites(preq);
        course.creq = await this.buildRequisites(creq);

        return course;
    }

    async buildRequisites(requisite){
        const  result = []
     
        for(let i=0;i<requisite.length;i++){
            const course = await getCourseByName(requisite[i]);

            const obj = {};
            
            obj.name = course.name;
            obj._id = course._id;

            result[i] = JSON.stringify(obj);
        }
  
        return result;
    }

    async handleAdd(){
        const{id} = this.props.match.params;
        const response = await addCourse({id});
        if(!response){
            alert("Error adding course to your course list");
        }else{
            alert("Successfully added course to your list");
        }
    }

    async handleRemove(){
        const{id} = this.props.match.params;
        const response = await removeCourse({id});
        alert(response);
        if(!response){
            alert("Error removing course from your course list");
        }else{
            alert("Successfully removed course to your list");
        }
    }

    render(){
        const {name, cred,creq,dept,desc,link,preq} =this.state;
       
        return(
            <div>
            <Sidebar/>
            <div className="courseInfoContainer">
                <h1 className="mt-4 text-center">{name}</h1>
                <br></br>
                <div className="courseInfo container-fluid">
                    <label htmlFor="deptLink" className="deptLabel">Department:  </label>
                    <Link className="ml-2" to={`/departments/${dept}`} id="deptLink">{dept}</Link>
                    <div className="col-xs-12">
                        <label htmlFor="courseDescription" className="novecentoMedium borderBottom"><strong><u>Course Description:</u></strong></label>
                        <p id="courseDescription">{desc}</p>
                    </div>
                    {preq.length>0? <Requisites list={(preq)}  type="preq"/>:null}
                    {creq.length>0? <Requisites list={(creq)}  type="creq"/>:null}
                    {cred?<p>Credits: {cred}</p> : null}
                    <label htmlFor="courseLink"><strong>For More Info:</strong> </label>
                    <Link className="ml-2"  to={link} id="courseLink">{link}</Link>
                    <div className="row">
                        {/* TODO - Conditionally render which button --> Add to Courses / Remove Course */}
                        <button className="btn btn-secondary ml-3 mt-3" onClick={this.handleAdd}>
                            Add to Courses
                        </button>
                    </div>
                    <div className="row">
                        {/* TODO - Conditionally render which button --> Add to Courses / Remove Course */}
                        <button className="btn btn-danger ml-3 mt-3" onClick={this.handleRemove}>
                            Remove Course 
                        </button>
                    </div>
                </div>

            </div>
           </div>
        )
    }

}

export default CourseInfo;