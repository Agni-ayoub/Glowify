import { useContext, useState } from "react";
import HomePageFi from "../../components/homePageFi/homePageFi";
import NavBar from "../../components/navBar/navBar";
import "./homePage.css";
import Marquee from "../../components/marquee/marquee";
import FlashSales from "../../components/flashSales/flashSales";
import Brag from "../../components/brag/brag";
import Feature from "../../components/features/feature";
import Fin from "../../components/finisher/fin";
import SideNav from "../../components/sideNav/sideNav";
import { cartContext } from "../../main";

function HomePage(){
    const [sideNav, setSideNav] = useState(false);
    const {cart,setCart} = useContext(cartContext); 
    

    return (
        <div className="homePage">
            {sideNav?
            <div onClick={()=>setSideNav(false)} className="blurry"></div>:false
            }
            <NavBar  setSideNav= {setSideNav} sideNav={sideNav} />
            <div className="homeFi">
                <HomePageFi />      
            </div>
            <div className={sideNav? "sideNav sideNavOn":"sideNav"} >
                <SideNav setSideNav = {setSideNav}  sideNav={sideNav}/>
            </div>
            <Marquee />
            <FlashSales />
            <Brag />
            <Feature />
            <Fin />
        </div>
    )
}export default HomePage;