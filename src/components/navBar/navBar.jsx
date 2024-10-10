import "./navBar.css";
import {NavLink} from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { globalContext } from "../../main";
import { useContext } from "react";

function NavBar(props){
    const setSideNav = props.setSideNav;
    const handleSideNav = ()=>{
        setSideNav(true)
    };    
    const {auth} = useContext(globalContext); 
    return(
        <div className="allNav">
            <nav>
                <NavLink to="/homePage">
                    <div className="logo">
                        <img src="/src/data/logo/logo.svg" />
                    </div>
                    <div className="small-logo">
                        <p>
                            G
                        </p>
                    </div>
                </NavLink>
                <div className="searchDiv">
                    <input type="search" placeholder="Search for products ..." />  
                    <IoSearchOutline className="searchIcon"/>
                </div>
                <div className="border">
                </div>
                <NavLink to={auth?"":"/login"} className="accountNav">
                    <img src={(auth)?auth?.image:"/src/data/icons/account.svg"} className="icon" id={auth?"profileImg":""} />
                    <div className="accountNavText">
                        <p className="userName">
                            {auth?.firstName} {auth?.lastName}
                        </p>
                    </div>
                </NavLink>
                <div className="border">
                </div>
                <div onClick={()=>handleSideNav()} className="bagNav">
                    <img src="/src/data/icons/bag.svg" className="icon bagIcon"/>
                    <div className="bagNumber">
                        <span>
                            {0}
                        </span>
                    </div>
                    <div className="bagText">
                        <p>
                            My bag
                        </p>
                    </div>
                </div>
                <div className="menu">
                    <RxHamburgerMenu className="menuIcon"/>
                </div>
            </nav>
            <div className="nav">
                <div className="navDivi allCategories">
                    <p>
                        All categories 
                    </p>
                    <div className="showMore">
                        
                    </div>
                </div>
                <div className="border"></div>
                <div className="navDivi allCategories">
                    <p>
                        Shop
                    </p>
                    <div className="showMore">
                        
                    </div>
                </div>
                <div className="border"></div>
                <div className="navDivi allCategories">
                    <p>
                        Products 
                    </p>
                    <div className="showMore">
                        
                    </div>
                    <div className="showRoom">
                    </div>
                </div>
                <div className="border"></div>
                <div className="navDivi contact">
                    <p>
                        Contact 
                    </p>
                    <div className="showMore showMoreContact">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}export default NavBar;