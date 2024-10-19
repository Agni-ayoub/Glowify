import { useContext } from "react";
import "./sideNav.css";
import { globalContext } from "../../main";
import { handleAdd, handleTake } from "../../../tools";

export default function SideNav({ setSideNav }) {
    const { cart, setCart, userId } = useContext(globalContext);
    return (
        <div className="insideSide">
            <div className="notch">
                <p>Your Cart {(cart?.products?.length)?cart.products.length:0}</p>
                <p onClick={() => setSideNav(false)}>Close</p>
            </div>
            <div className="underAll">
                {cart?.products?.map((elem) => (
                    <div key={elem?.id} className="sidePr">
                        <div className="sideImg">
                            <img src={elem?.thumbnail} alt={elem?.title} />
                        </div>
                        <div className="sideSide">
                            <div className="sideTitle">
                                <p>{elem?.title}</p>
                            </div>
                            <div className="allNumber">
                                <p onClick={()=>handleTake(elem,setCart,userId)} className="mi sym">
                                    -
                                </p>
                                <input
                                    type="number"
                                    value={elem?.quantity}
                                    min={1}
                                    readOnly
                                />
                                <p onClick={() => handleAdd(elem,setCart,userId)} className="plu sym">
                                    +
                                </p>
                            </div>
                            <button className="sideBtn">More details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
