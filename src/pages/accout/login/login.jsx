import { useContext, useState } from "react";
import "./login.css";
import axios from "../../../api/axios";
import { globalContext } from "../../../main";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const { setAuth} = useContext(globalContext);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setErrorMsg(null)
        try {
            const response = await axios.post("/auth/login",
                JSON.stringify({ password: pwd, username: user, expiresInMins: 30 }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
 
            if (response?.data?.accessToken) {
                setAuth(response?.data);
                localStorage.setItem('token', response.data.accessToken)
                localStorage.setItem('refresh',response?.data?.refreshToken)
                navigate('/homePage');

            } else {
                setErrorMsg("Login failed: No access token received.");
            }
        } catch (err) {
            if (!err?.response) {
                console.error('No server response:', err);
                setErrorMsg("No server response. Please try again later.");
            } else if (err.response?.status === 400) {
                console.error('Unauthorized:', err);
                setErrorMsg("Invalid username or password");
            } else {
                console.error('Login failed:', err);
                setErrorMsg("Login failed. Please try again.");
            }
        }
    };
    return (
        <div className="loginBody">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <br />
                <h3>Login Here</h3>
                <div className={(errorMsg)?"err":"errb"}>
                    {errorMsg && <p className="error">{errorMsg}!</p>} 
                </div>
                <label htmlFor="username">Username</label>
                <input 
                    onChange={(e) => setUser(e.target.value)} 
                    className="loginInput" 
                    type="text" 
                    placeholder="Enter your username" 
                    id="username" 
                    autoComplete="off" 
                    value={user} 
                    required 
                />

                <label htmlFor="password">Password</label>
                <input 
                    onChange={(e) => setPwd(e.target.value)} 
                    className="loginInput" 
                    type="password" 
                    placeholder="Enter your password" 
                    id="password" 
                    value={pwd} 
                    required 
                />

                <button className="btnLogin" type="submit">Log In</button>

                <div className="social">
                    <div className="go"><i className="fab fa-google"></i> Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
                </div>
            </form>
        </div>
    );
}
