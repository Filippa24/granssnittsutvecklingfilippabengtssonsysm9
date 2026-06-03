import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero__text-container">
        <h1 className="hero__title">Clutch Up Bikes</h1>
        {/* <Link to="/register">
          <h3 className="hero__mobile-text">Create user</h3>
        </Link>
        <Link to="/login">
          <h3 className="hero__mobile-text">Sign in</h3>
        </Link> */}
        <h3 className="hero__slogan">Discover our products</h3>
      </div>
    </section>
  );
}

export default Home;
