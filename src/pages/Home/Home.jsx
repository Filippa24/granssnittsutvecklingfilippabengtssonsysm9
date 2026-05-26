import "./Home.css";

function Home() {
  return (
    <section
      className="hero">
      <div className="hero__text-container">
        <h1 className="hero__title">Company name</h1>
        <h3 className="hero__mobile-text">Create user</h3>
        <h3 className="hero__mobile-text">Sign in</h3>
        <h3 className="hero__slogan">Slogan</h3>
      </div>
    </section>
  );
}

export default Home;


      // style={{
      //   backgroundImage: `url(${process.env.PUBLIC_URL}/Media/media.backgrounds/background.1.jpg)`,
      // }}