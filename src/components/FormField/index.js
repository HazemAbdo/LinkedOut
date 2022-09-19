import PropTypes from "prop-types";

import FormField from "./FormField";
import StyledFormField from "./FormField.style";

const FormFieldComponent = ({
  label,
  type,
  value,
  placeholder,
  name,
  className,
  errorMsg = null,
}) => {
  return (
    <StyledFormField errorMsg={errorMsg}>
      <FormField
        label={label}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        className={className}
        errorMsg={errorMsg}
      />
    </StyledFormField>
  );
};
FormFieldComponent.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  errorMsg: PropTypes.string,
};
export default FormFieldComponent;
