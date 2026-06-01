import "./Register.css";
import RegisterCard from "../../components/RegisterCard/RegisterCard";
import Footer from "../../components/Footer/Footer";

function Register() {
    return (
      <div className="register__background">
        <RegisterCard />
        <Footer />
      </div>
    );
}

export default Register;