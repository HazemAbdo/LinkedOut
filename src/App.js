import { render } from "react-dom";

import SignUpComponent from "./feature/SignUp";

SignUpComponent;
const App = () => {
  return (
    <>
      <SignUpComponent />
    </>
  );
};
render(<App />, document.getElementById("root"));
export default App;
