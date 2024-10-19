import { useContext, useRef, useState } from "react";
import NavBar from "../../components/navBar/navBar";
import SideNav from "../../components/sideNav/sideNav";
import "./discreption.css";
import { Link } from "react-router-dom";
import { globalContext } from "../../main";
import { addToCart, formatRating } from "../../../tools";

export default function ProductDetails(){
    const [sideNav, setSideNav] = useState(false);
    const {toDetail,cart,setCart,userId} = useContext(globalContext);
    const imageRef = useRef();
    const handleMouseMove = (e) => {
        const imageElement = imageRef.current;
        const rect = imageElement.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 

        imageElement.style.transformOrigin = `${x}px ${y}px`;
    };
    return(
        <div className="dis">
            {sideNav?
            <div onClick={()=>setSideNav(false)} className="blurry"></div>:false
            }
            <NavBar setSideNav = {setSideNav} />
            <div className={sideNav? "sideNav sideNavOn":"sideNav"} >
                <SideNav setSideNav = {setSideNav}  sideNav={sideNav}/>
            </div>
        <main>
            <div className="dcard">
                <div className="card__title">
                    <Link to="/homePage" className="icon">
                        <i className="fa fa-arrow-left"></i>
                    </Link>
                    <h3 className="dh3">Product Details</h3>
                </div>
                <div className="card__body">
                    <div className="firsthalf half">
                        <div className="featured_text">
                            <h1>{toDetail.title}</h1>
                            <p className="sub">{toDetail.brand}</p>
                            <p className="price">${toDetail.price}</p>
                        </div>
                        <div className="imageImage">
                            <div onMouseMove={handleMouseMove} className="image">
                                <img ref={imageRef} src={toDetail.thumbnail} />
                            </div>
                        </div>
                    </div>
                    <div className="half">
                        <div className="description">
                            <h1>Product Discreption</h1>
                            <p>{toDetail.description}</p>
                        </div>
                        <span className="stock">
                            Quantity available <span>({toDetail.stock})</span>
                        </span>
                        <div className="reviews">
                            <span>({toDetail.reviews?.length} reviews)</span>
                            {
                                toDetail.reviews?.map(elem=>{
                                    return(
                                        <div className="review" key={elem.reviewerName}>
                                            <p className="reviwerName">
                                                {elem.reviewerName} 
                                            </p>
                                            <p>
                                                rating given {elem.rating}{formatRating(elem.rating)}
                                            </p>
                                            <div className="border"/>
                                            <p>
                                                comment : {elem.comment}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="card__footer">
                    <div className="recommend">
                    <p>Recommended by</p>
                    <h3 className="dh3 logodis">Glowify</h3>
                    </div>
                    <div className="action">
                    <button onClick={()=>addToCart(toDetail,cart,setCart,userId)} className="detailsbtn">Add to cart</button>
                    <button className="detailsbtn">Buy Now</button>
                    </div>
                </div>
            </div>
        </main>
        </div>
    )
};