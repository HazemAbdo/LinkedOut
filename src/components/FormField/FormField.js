import PropTypes from "prop-types";
const FormField = ({
  label,
  type,
  value,
  placeholder,
  name,
  className,
  errorMsg = null,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        required
        value={value}
        placeholder={placeholder}
        name={name}
        className={className}
        key={name - className}
      />
      {errorMsg && <p>{errorMsg}</p>}
    </>
  );
};
FormField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
};
export default FormField;
