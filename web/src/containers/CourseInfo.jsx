import React,{Component} from 'react';
import { getCourseById } from '../routes/courseRoutes';
import './css/CourseInfo.css'
import Sidebar from '../components/Sidebar';
import Requisites from '../components/Requisites';
class CourseInfo extends Component{
    constructor(){
        super();
        this.state={
            id: "5fb9575028191e40bc76d915",
            course:{
                name: '',
                code: '',
                cred: '',
                creq: [],
                dept: '',
                desc: '',
                link: '',
                preq: []
            }
        };
        this.buildRequisites = this.buildRequisites.bind(this);
    }

   async  componentDidMount(){
        const{id} = this.state;
        const response = await getCourseById(id);
        this.state.course = response;
        console.log(this.state.course);
    }

    buildRequisites(requisite){
        let str ="";
        for(let i=0;i<requisite.length;i++){
            str+=requisite[i] ;
            if(i+1!==requisite.length){
                str+= ", ";
            }
        }
        console.log(str);
        console.log(requisite[0]);
        return str;
    }

    render(){
        const {name,code,cred,creq,dept,desc,link,preq} =this.state.course;
        let strPreq = this.buildRequisites(preq);
        let strCreq = this.buildRequisites(creq);
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
                    {preq.length>0? <Requisites courses={strPreq} type="preq"/>:null}
                    {creq.length>0? <Requisites courses={strCreq} type="creq"/>:null}
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
