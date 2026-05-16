function Navbar() {
  return (
    <section className="navbar">
      <div className="navbar__mobile--container">
        <h4 className="navbar__mobile--text">Home</h4>
        <h4 className="navbar__mobile--text">Products</h4>
        <h4 className="navbar__mobile--text">Cart</h4>
      </div>
      <div className="navbar__container">
        <h4 className="navbar__text">Home</h4>
        <h4 className="navbar__text">Products</h4>
        <h4 className="navbar__text">Cart</h4>
        <h4 className="navbar__text">Create user</h4>
        <h4 className="navbar__text">Sign in</h4>
      </div>
    </section>
  );
}

export default Navbar;
