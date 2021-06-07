import homePageLanding from "Image/homePageLanding.png"
import "./HomePageLanding.css"
import {Button} from 'antd'
import {useState} from "react";

function HomePageLanding(){
    const[hover, sethover] = useState(true)

    return(
        <div>
            <div className="homePageLandingTitleDiv">
                <h1 className="homePageLandingTitle">Social <span style={{color: "#9980fa"}}>Gaming</span></h1>
                <p className="homePageLandingTextWelcome">Play.Together.</p>
                {hover &&<Button shape="round" onMouseEnter={()=> sethover(!hover)} className="signInButton" style={{borderColor: "#9980fa", background: "none"}} type = "primary">Sing In</Button>}
                {!hover &&<Button shape="round" onMouseLeave={()=> sethover(!hover)} className="signInButton" style={{borderColor: "#9980fa", background: "#9980fa"} } type = "primary">Sing In</Button>}
            </div>
            <img className="homePageLandingImage" src={homePageLanding}/>
        </div>
    )
}

export default HomePageLanding