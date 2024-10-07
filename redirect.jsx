import { Navigate } from "react-router-dom";
import HomePage from "./src/pages/homePage/homePage";

function Redirect(){
    return(
        <Navigate to={"/homePage"} />
    )
}export default Redirect;