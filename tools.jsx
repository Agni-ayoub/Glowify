import { useEffect } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa6";
export const formatRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    
    return (
        <div>
            {[...Array(fullStars)].map((_, i) => (
                <FaStar key={i} className="star" />
            ))}
            {halfStar && <FaStarHalf className="star" />}
        </div>
    );
};

export const calcOriginalPrice = (promoPrice, reductionRate)=>{
    const originalPrice = promoPrice/(1 - reductionRate/100);
    return originalPrice.toFixed(2);
};
export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { products: data.products };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { products: [] };
    }
};
export const get = (setProducts, BASE_URL)=>{
    useEffect(()=>{
        const getProducts = async ()=>{
            const {products} = await fetchData(BASE_URL);
            setProducts(products);
        }
        getProducts();
    },[])
}
export const formatCountDown = (dueDate,today)=>{
        const distance = dueDate - today;
        const days = Math.floor(distance/(1000*60*60*24));
        const hours = Math.floor(distance%(1000*60*60*24)/(1000*60*60));
        const minutes = Math.floor(distance%(1000*60*60)/(1000*60));
        const seconds = Math.floor(distance%(1000*60)/1000);
        
        return(
            {days:days, hours:hours, minutes, seconds:seconds}
        )
};