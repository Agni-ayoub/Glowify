import "./feature.css";
export default function Feature(){
    return(
        <div className="featureContainer">
            <div className="firstContainer">
                <div className="fe feFirst">
                    <img src="/src/data/icons/feature_icon_1.svg"/>
                    <p>
                        Quality Assurance
                    </p>
                </div>
                <div className="fe feSecond">
                    <img src="/src/data/icons/feature_icon_2.svg"/>
                    <p>
                        Quality Assurance
                    </p>
                </div>
            </div>
            <div className="secondContainer">
                <div className="fe feThird">
                    <img src="/src/data/icons/feature_icon_3.svg"/>
                    <p>
                        Quality Assurance
                    </p>
                </div>
                <div className="fe feForth">
                    <img src="/src/data/icons/feature_icon_4.svg"/>
                    <p>
                        Quality Assurance
                    </p>
                </div>
            </div>
            <div className="thirdContainer">
                <div className="fe">
                    <img src="/src/data/icons/feature_icon_5.svg"/>
                    <p>
                        Quality Assurance
                    </p>
                </div>
            </div>
        </div>
    )
}