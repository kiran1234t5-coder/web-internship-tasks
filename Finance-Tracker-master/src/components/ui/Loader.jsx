function Loader({ size = "medium", text = "Loading..." }) {
  return (
    <div className={`loader loader-${size}`}>
      <div className="spinner"></div>
      {text && <span className="loader-text">{text}</span>}
    </div>
  );
}

export default Loader;
