function Button({ children, onClick, type = "button", className = "", ...props }) {
  return (
    <button
      className={`btn ${className}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
