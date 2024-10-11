import NavBar from "../../components/navBar/navBar";
import SideNav from "../../components/sideNav/sideNav";
import { useContext, useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5"; 
import "./shop.css";
import { addToCart, calcOriginalPrice, formatRating, get } from "../../../tools";
import { globalContext } from "../../main";

export default function Shop(){
    const Base_Url = 'https://dummyjson.com/products?limit=0';
    const [sideNav, setSideNav] = useState(false);
    const [products, setProducts] = useState([]);
    const {cart, setCart, userId} = useContext(globalContext);
    useEffect(() => {
        get(setProducts, Base_Url)
      }, []);
    return(
        <div className="shop">
            {sideNav?
            <div onClick={()=>setSideNav(false)} className="blurry"></div>:false
            }
            <NavBar setSideNav = {setSideNav} />
            <div className={sideNav? "sideNav sideNavOn":"sideNav"} >
                <SideNav setSideNav = {setSideNav}  sideNav={sideNav}/>
            </div>
            <div className="productContainer">
                {
                    products.map((p)=>{
                        return(
                            <div key={p.id} className="product">
                                <div className="thumbnail">
                                    <img src={p.thumbnail} />
                                    <div className="moreProducts">
                                        <IoHeartOutline className="heartShop"/>
                                        <div
                                            onClick={()=>addToCart(p,cart,setCart,userId)}
                                            className="productsButtonShop">
                                            <p>
                                                Add to Bag
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="underImg">
                                    <div className="brandName">
                                        <p>
                                            {p.brand}
                                        </p>
                                    </div>
                                    <div className="title">
                                        <p>
                                            {p.title}
                                        </p>
                                    </div>
                                    <div className="price">
                                        <p>
                                            ${p.price}  
                                        </p>
                                        <span>
                                            ${calcOriginalPrice(p.price,p.discountPercentage)}
                                        </span>
                                        <div className="discount">
                                            <p>
                                                {p.discountPercentage}%
                                            </p>
                                        </div>
                                    </div>
                                    <div className="rating">
                                        {
                                            formatRating(p.rating)
                                        }
                                        <p>
                                            {p.rating}
                                        </p>
                                    </div>
                                    <div    className="productsButtonShop productDetails">
                                        <p>
                                            Discover More
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}