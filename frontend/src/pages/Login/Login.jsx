import Footer from "../../components/Footer/Footer";
import LoginCard from "../../components/LoginCard/LoginCard";
import "./Login.css";

function Login() {
    return (
        <div className="login__background">
          <LoginCard />
          <Footer />
        </div>
    );
}

export default Login;