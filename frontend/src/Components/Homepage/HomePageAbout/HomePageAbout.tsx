import "./HomePageAbout.css"
import src1 from "../../../Images/about01.png"
import src2 from "../../../Images/about02.png"
import src3 from "../../../Images/about03.png"

function HomePageAbout(){
    return (
        <div className = "backgroundDiv">
            <h1 className={"title"}>What is Gaming <span style={{color: "#9980fa"}}> House</span>?</h1>
            <div className = "textContainer">
                <div className = "textPart" >
                    <img src={src1} style={{marginTop : "-53px"}}/>
                    <p style={{margin : "10px", textAlign : "center"}}>Play with your friends in a few clicks. See if they are online, and what they are currently playing. You can then join them in a game with ease thanks to Gaming <span style={{color: "#9980fa"}}>House</span>.</p>
                </div>
                <div className = "textPart">
                    <img src={src2}/>
                    <p style={{margin : "10px", textAlign : "center"}}>There is strength in numbers. Discover new people and unite to lead you to victory. You will be able to exceed your limits by playing with new gamers you have met thanks to Gaming <span style={{color: "#9980fa"}}>House</span>.</p>
                </div>
                <div className = "textPart">
                    <img src={src3}/>
                    <p style={{margin : "10px", textAlign : "center"}}>Create a competitive team to get to a professional level faster. Build a sustainable team with the many group features of Gaming <span style={{color: "#9980fa"}}>House</span>.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePageAbout