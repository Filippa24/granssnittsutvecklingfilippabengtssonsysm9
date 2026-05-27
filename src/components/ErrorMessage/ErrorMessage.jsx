//komponent för att hantera errormessages
function ErrorMessage({ error }) {
    
    //placera ErrorMessage i CheckoutCards jsx för att visa felmeddelandena i UI
  return (
    <div className="errorMessage">
      {(error.firstName || error.lastName || error.email || error.address) && (
        <span>Please fill in all required fields to place your order. </span>
      )}
      {error.emailFormat && <span>Enter a valid email containing @.</span>}
    </div>
  );
}

export default ErrorMessage;