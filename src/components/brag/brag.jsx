import { useContext, useRef } from "react";
import "./brag.css"
import { CiStar } from "react-icons/ci";
import { globalContext } from "../../main";

export default function Brag(){
    const {flashSectionRef} = useContext(globalContext);
    const scrollToSection = () => {
        if (flashSectionRef.current) {
          flashSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      };
    return(
        <div className="brag">
            <div onClick={scrollToSection} className="bragOffers">
                <p className="limitedOffers">
                    Limited Time Offers
                </p>
                <CiStar className="gnar"/>
                <CiStar className="gnar gnar2"/>
                <div className="percent">
                    <p>
                        20%
                    </p>
                </div>
                <button className="btn1 bragButton">
                    Flash Sales!
                </button>
            </div>
            <div className="tow">
                <div className="bragDelivery">
                    <img src="/src/data/homePage/dl.png" />
                    <p className="shippingfifthy">
                        $50
                    </p>
                    <button className="btn2 bragButton">
                        Shop Now!
                    </button>
                </div>
                <div className="moreBrag">
                <button className="btn3 bragButton">
                    Discover!
                </button>
                    <img src="/src/data/homePage/dl2.png" />
                </div>
            </div>
        </div>
    )
}