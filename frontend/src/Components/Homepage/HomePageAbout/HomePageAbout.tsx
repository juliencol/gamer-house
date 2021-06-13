import "./HomePageAbout.css"
import src1 from "../../../Images/about01.png"
import src2 from "../../../Images/about02.png"
import src3 from "../../../Images/about03.png"

function HomePageAbout(){
    return (
        <div className = "backgroundDiv">
            <h1 className={"title"}>What is Gaming<span style={{color: "#9980fa"}}> House</span>?</h1>
            <div className = "textContainer">
                <div className = "textPart" >
                    <img src={src1} style={{marginTop : "-53px"}}/>
                    <p style={{margin : "10px", textAlign : "center"}}>Jouez avec vos amis en quelques clics. Regardez si ils sont connectés, et à quoi ils jouent actuellement. Vous pourrez ainsi les rejoindre sur une partie avec une facilité déconcertante grâce à Gaming <span style={{color: "#9980fa"}}>House</span>.</p>
                </div>
                <div className = "textPart">
                    <img src={src2}/>
                    <p style={{margin : "10px", textAlign : "center"}}>L'union fait la force. Découvrez de nouvelles personnes et unissez vous afin de vous mener vers la victoire. Vous allez pouvoir dépasser vos limites en jouant avec de nouveaux gamers rencontrés grâce à Gaming <span style={{color: "#9980fa"}}>House</span>.</p>
                </div>
                <div className = "textPart">
                    <img src={src3}/>
                    <p style={{margin : "10px", textAlign : "center"}}>Créer une équipe compétitive afin de vous hisser plus rapidement à un niveau professionnel. Construisez une équipe pérenne grâce aux nombreuses fonctionnalités de groupes de Gaming <span style={{color: "#9980fa"}}>House</span>.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePageAbout