import "./cards.css";
import { NavLink } from "react-router-dom";

export default function Cards(){
    return(
        <div className="firstInCards">
            <div className="card firstCard">
                <div className="cardContent">
                    <img className="skinDrop" src="/src/data/homePage/skinDrop.jpeg"/>
                    <h1>
                        Get a Radiant Skin!
                    </h1>
                    <div className="buttonBehind">
                        <h4 className="smallContent" >
                            Experience the ultimate skinCare TRANSFORMATION with our breakthrough formula
                        </h4>
                        <NavLink to={"/shop/skinCare"} className="cardButton">
                            SHOP NOW
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="card firstCard secondCard">
                <div className="cardContent">
                    <img className="skinDrop" src="/src/data/homePage/pallet.jpeg"/>
                    <h1>
                        Enhance Your Natural Beauty
                    </h1>
                    <div className="buttonBehind">
                        <h4 className="smallContent" >
                            Experience the ultimate skinCare TRANSFORMATION with our breakthrough formula
                        </h4>
                        <NavLink to={"/shop/all"} className="cardButton">
                            SHOP NOW
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="card firstCard thirdCard">
            <div className="cardContent">
                    <img className="skinDrop" src="/src/data/homePage/trend.jpeg"/>
                    <h1>
                        Discover Trending Makeup
                    </h1>
                    <div className="buttonBehind">
                        <h4 className="smallContent" >
                            Experience the ultimate skinCare TRANSFORMATION with our breakthrough formula
                        </h4>
                        <NavLink to="/shop/PopularMakeUp" className="cardButton">
                            SHOP NOW
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}