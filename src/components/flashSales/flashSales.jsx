import { useContext, useEffect, useState } from "react";
import "./flashSales.css"
import { IoIosFlash } from "react-icons/io";
import {  FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { addToCart, calcOriginalPrice, formatCountDown, get } from "../../../tools";
import {globalContext} from "../../main";

export default function FlashSales(){
    const [flashProducts, setFlashProducts] = useState([]);
    const Base_Url = 'https://dummyjson.com/products/category/beauty';
    const { userId, setCart, cart , flashSectionRef} = useContext(globalContext);
    useEffect(()=>{
        get(setFlashProducts,Base_Url);
    },[])
    const [dueDate, setDueDate] = useState(new Date("Jan 1, 2025 00:00:00"));
    const [currtTime, setCurretTime] = useState(new Date().getTime());
    useEffect(()=>{
        const intervalId = setInterval(() => {
            setCurretTime(new Date().getTime());
        }, 1000);
        return()=>{
            clearInterval(intervalId);
        }
    },[]);
    return(
        <div ref={flashSectionRef} className="flashSales">
            <div className="flashSalesAllContainer">
                <div className="flashSalesTop">
                    <div className="flashSalesHeader">
                        <div className="flash">
                            Fla<IoIosFlash className="flashIcon"/>
                            <p>
                                h
                            </p>
                        </div>
                        <p className="salesP">
                            Sales
                        </p> 
                    </div>
                    <div className="timer">
                        <p>
                            Ends in
                        </p>
                        <div>
                            <p>
                                {
                                    (formatCountDown(dueDate,currtTime).days<=9)? formatCountDown(dueDate,currtTime).days.toString().padStart(2,"0"):formatCountDown(dueDate,currtTime).days
                                }
                            </p>
                        </div>
                        <p className="dots">
                            :
                        </p>
                        <div>
                            <p>
                                {
                                    (formatCountDown(dueDate,currtTime).hours<=9)? formatCountDown(dueDate,currtTime).hours.toString().padStart(2,"0"):formatCountDown(dueDate,currtTime).hours
                                }
                            </p>
                        </div>
                        <p className="dots">:</p>
                        <div>
                            <p>
                                {
                                    (formatCountDown(dueDate,currtTime).minutes<=9)? formatCountDown(dueDate,currtTime).minutes.toString().padStart(2,"0"):formatCountDown(dueDate,currtTime).minutes
                                }
                            </p>
                        </div>
                        <p className="dots">
                            :
                        </p>
                        <div>
                            <p>
                                {
                                (formatCountDown(dueDate,currtTime).seconds<=9)? formatCountDown(dueDate,currtTime).seconds.toString().padStart(2,"0"):formatCountDown(dueDate,currtTime).seconds
                                }
                            </p>
                        </div>
                        <p className="showMoreFlash">
                            Show More
                        </p>
                    </div>
                </div>
                <div className="FlashProductContainer">
                    {
                        flashProducts.map((p)=>{
                            return(
                            <div key={p.id} className="flashProduct">
                                <div className="flashProductImgDiv">
                                    <img src={p.thumbnail} />
                                    <div
                                        onClick={()=>addToCart(p,cart,setCart,userId)}
                                        className="moreFlashProducts">
                                        <IoHeartOutline className="heart"/>
                                        <div className="productsButton">
                                            <p>
                                                Add to Bag
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                    <div className="flashUnderImg">
                                        <div className="flashTitle">
                                            <p>
                                               {p.title}
                                            </p>
                                        </div>
                                        <div className="flashPrice">
                                            <p data-price={calcOriginalPrice(p.price,p.discountPercentage)}>
                                                {p.price}
                                            </p>
                                        </div>
                                        <div className="flashRatingDiv">
                                            {
                                                (p.rating>=4)?
                                                <div>
                                                    <FaStar className="star"/>
                                                    <FaStar className="star"/>
                                                    <FaStar className="star"/>
                                                    <FaStar className="star"/>
                                                    <FaStarHalfAlt className="star"></FaStarHalfAlt>
                                                </div>:(p.rating>=3)?
                                                <div>
                                                    <FaStar className="star"/>
                                                    <FaStar className="star"/>
                                                    <FaStar className="star"/>
                                                    <FaStarHalfAlt className="star"></FaStarHalfAlt>
                                                </div>:(p.rating>=2)?
                                                <div>
                                                    <FaStar className="star"/>
                                                    <FaStar className="star"/>
                                                    <FaStarHalfAlt className="star"></FaStarHalfAlt>
                                                </div>:(p.rating>=1)?
                                                <div>
                                                    <FaStar className="star"/>
                                                    <FaStarHalfAlt className="star"></FaStarHalfAlt>
                                                </div>:""
                                            }
                                            <p>
                                                {p.rating}
                                            </p>
                                        </div>
                                        <p className="stockLeft">
                                            {p.stock} Left
                                        </p>
                                        <div className="stockTrack">
                                            <div style={{width: `${p.stock}%`}} className="filler">
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flashPricePromoDiv">
                                        <p>
                                            {p.discountPercentage}% OFF
                                        </p>
                                    </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}