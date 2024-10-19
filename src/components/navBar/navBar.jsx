import "./navBar.css";
import { Link, NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { globalContext } from "../../main";
import { useContext, useEffect, useRef, useState } from "react";

function NavBar(props) {
    const { setSideNav } = props;
    const { auth, cart, setToDetail } = useContext(globalContext);
    const [key, setKey] = useState("");
    const [products, setProducts] = useState([]);
    const searchRef = useRef(null);

    const debounceSearch = useRef(null);

    useEffect(() => {
        if (debounceSearch.current) {
            clearTimeout(debounceSearch.current);
        }

        debounceSearch.current = setTimeout(async () => {
            if (key !== "") {
                const res = await fetch(`https://dummyjson.com/products/search?q=${key}`);
                const data = await res.json();
                setProducts(data?.products || []);
            } else {
                setProducts([]);
            }
        }, 400); // 400ms debounce

        return () => clearTimeout(debounceSearch.current);
    }, [key]);

    const handleSideNav = () => {
        setSideNav(prev => !prev); 
    };

    return (
        <div className="allNav">
            <nav>
                <NavLink to="/homePage">
                    <div className="logo">
                        <img src="/src/data/logo/logo.svg" alt="Logo" />
                    </div>
                    <div className="small-logo">
                        <p>G</p>
                    </div>
                </NavLink>
                <div className="searchDiv">
                    <input
                        onChange={() => setKey(searchRef.current.value)}
                        ref={searchRef}
                        value={key}
                        type="search"
                        placeholder="Search for products ..."
                    />
                    <IoSearchOutline className="searchIcon" />
                    <div className="results">
                        {products.length > 0 ? (
                            products.map((elem) => (
                                <Link className="Link"
                                    onClick={() => {
                                        setToDetail(elem);
                                    }}
                                    to={"/productDetails"}
                                    key={elem.id}
                                >
                                    <img src={elem?.thumbnail} alt={elem?.title} />
                                    <p>{elem?.title}</p>
                                </Link>
                            ))
                        ) : key !== "" ? (
                            <p>No products found</p>
                        ) : null}
                    </div>
                </div>
                <div className="border"></div>
                <NavLink to={auth ? "" : "/login"} className="accountNav">
                    <img
                        src={auth ? auth?.image : "/src/data/icons/account.svg"}
                        className="icon"
                        id={auth ? "profileImg" : ""}
                        alt="Account"
                    />
                    <div className="accountNavText">
                        <p className="userName">
                            {!auth ? "Login" : `${auth.firstName} ${auth.lastName}`}
                        </p>
                    </div>
                </NavLink>
                <div className="border"></div>
                <div onClick={handleSideNav} className="bagNav">
                    <img src="/src/data/icons/bag.svg" className="icon bagIcon" alt="Bag" />
                    <div className="bagNumber">
                        <span>{cart?.products?.length ? cart.products.length : 0}</span>
                    </div>
                    <div className="bagText">
                        <p>My bag</p>
                    </div>
                </div>
                <div className="menu">
                    <RxHamburgerMenu className="menuIcon" />
                </div>
            </nav>
            <div className="nav">
                <div className="navDivi allCategories">
                    <p>All categories</p>
                    <div className="showMore"></div>
                </div>
                <div className="border"></div>
                <div className="navDivi allCategories">
                    <p>Shop</p>
                    <div className="showMore"></div>
                </div>
                <div className="border"></div>
                <div className="navDivi allCategories">
                    <p>Products</p>
                    <div className="showMore"></div>
                    <div className="showRoom"></div>
                </div>
                <div className="border"></div>
                <div className="navDivi contact">
                    <p>Contact</p>
                    <div className="showMore showMoreContact"></div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
