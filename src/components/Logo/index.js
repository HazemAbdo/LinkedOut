import { useState } from "react";

import Logo from "./Logo";
import StyledLogo from "./Logo.style";

const LogoComponent = ({ type }) => {
  const [logoType] = useState(type);
  return (
    <StyledLogo type={logoType}>
      <Logo type={logoType} />
    </StyledLogo>
  );
};
LogoComponent.propTypes = {
  type: String,
};
export default LogoComponent;
