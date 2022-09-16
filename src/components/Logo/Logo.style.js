import styled, { css } from "styled-components";
const StyledLogo = styled.div`
  ${(props) =>
    props.type === "withText" &&
    css`
      width: 135px;
      height: 40px;
    `}
  ${(props) =>
    props.type !== "withText" &&
    css`
      width: 40px;
      height: 40px;
      color: #0a66c2;
    `}
`;
export default StyledLogo;
