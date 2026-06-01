import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>404 - Page not found</h1>
      <Link to="/">Go to home</Link>
    </div>
  );
}

export default NotFound;
