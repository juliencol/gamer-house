import homePageLanding from "../../../Images/background.png"
import "./HomePageLanding.css"
import {Button} from 'antd'
import React, {useState} from "react";
import { Link } from 'react-router-dom';

function HomePageLanding(){
    const[hover, sethover] = useState(true)

    return(
        <div className = "homePageLanding">
            <div className="homePageLandingTitleDiv">
                <h1 className="homePageLandingTitle">Gaming <span style={{color: "#9980fa"}}>House</span></h1>
                <p style={{marginTop : "-50px", fontSize : "2em"}}>Play.Together.</p>
                {hover &&<Button shape="round" onMouseEnter={()=> sethover(!hover)} className="signInButton" style={{borderColor: "#9980fa", background: "none"}} type = "primary"><Link to="/authentication">Sing In</Link></Button>}
                {!hover &&<Button shape="round" onMouseLeave={()=> sethover(!hover)} className="signInButton" style={{borderColor: "#9980fa", background: "#9980fa"} } type = "primary"><Link to="/authentication">Sing In</Link></Button>}
            </div>
        </div>
    )
}

export default HomePageLanding