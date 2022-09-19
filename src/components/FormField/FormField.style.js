import styled from "styled-components";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  label {
    /* background-color: yellow; */
    color: rgba(0, 0, 0, 0.6);
  }
  input {
    /* background-color: red; */
    height: 32px;
    /*if there is an error set border color to red*/
    border: ${(props) => (props.errorMsg ? "red" : "black")} solid 1px;
  }
  p {
    /* background-color: green; */
    color: #d11124;
    margin-top: 1px;
    font-size: small;
  }
`;
export default StyledFormField;
