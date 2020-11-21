import React,{Component} from 'react';
import { getCourseById, getCourseByName } from '../routes/courseRoutes';
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
                    <a className="ml-2"href={"/department/:id"} id="deptLink">{dept}</a>
                    <div className="col-xs-12">
                        <label htmlFor="courseDescription" className="novecentoMedium borderBottom"><strong><u>Course Description:</u></strong></label>
                        <p id="courseDescription">{desc}</p>
                    </div>
                    {preq.length>0? <Requisites list={(preq)}  type="preq"/>:null}
                    {creq.length>0? <Requisites list={(creq)}  type="creq"/>:null}
                    {cred?<p>Credits: {cred}</p> : null}
                    <label htmlFor="courseLink"><strong>For More Info:</strong> </label>
                    <a className="ml-2"  href={link} id="courseLink">{link}</a>
                </div>
            </div>
           </div>
        )
    }

}

export default CourseInfo;
