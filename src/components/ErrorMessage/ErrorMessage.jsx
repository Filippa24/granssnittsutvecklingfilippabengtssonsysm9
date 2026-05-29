//komponent för att hantera errormessages
function ErrorMessage({ error, page }) {
  //placera ErrorMessage i CheckoutCards jsx för att visa felmeddelandena i UI
  return (
    <div className="error__message">
      {(error.firstName || error.lastName || error.email || error.address) && (
        <span>
          {page === "register"
            ? "Please fill in all required fields to create a user. "
            : "Please fill in all required fields to place your order. "}
        </span>
      )}
      {error.emailFormat && <span>Enter a valid email containing @.</span>}
      {error.mismatchedPasswords && (
        <span>Password and confirm password do not match.</span>
      )}
    </div>
  );
}

export default ErrorMessage;
