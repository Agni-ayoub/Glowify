import { useState, useEffect } from "react";
import "./sideNav.css";

export default function SideNav({sideNav, setSideNav}){
    const [products,setProducts] = useState([]);
    const BASE_URL = 'https://dummyjson.com';
    useEffect(()=>{
        const fetchData = async()=>{
            const repsonce = await fetch(`${BASE_URL}/products`);
            const data = await repsonce.json();
            setProducts(data.products);
        };
        fetchData();
    },[]);
    return(
        (sideNav)?
        <div className="insideSide">
            <div className="notch">
                <p>
                    Your Car 0
                </p>
                <p onClick={()=> setSideNav(false)} >
                    Close
                </p>    
            </div>
            <div className="underAll">
                {/*
                    cart.map(elem=>{
                        const matchingProducts = products.find(p=> elem.id === p.id);
                        if(matchingProducts){
                            return(
                                <div key={elem.id} className="sidePr">
                                    <div className="sideImg">
                                        <img src={matchingProducts.thumbnail}/>
                                    </div>
                                    <div className="sideSide">
                                        <div className="sifeTitle">
                                            <p>
                                                {matchingProducts.title}
                                            </p>
                                        </div>
                                        <div className="allNumber">
                                            <p onClick={()=>handleTake(elem)} className="mi sym">
                                                -
                                            </p>
                                            <input type="number" value={elem.quantity} min={1} readOnly/>
                                            <p onClick={()=> handleAdd(elem)} className="plu sym">
                                                +
                                            </p>
                                        </div>
                                        <button className="sideBtn">
                                            More details
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    })
                */}
            </div>
        </div>:""
    )
}