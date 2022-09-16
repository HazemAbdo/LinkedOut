import { render } from "react-dom";

import LogoComponent from "./components/Logo/index";
//TODO: where to set routes
LogoComponent;
const App = () => {
  return (
    <>
      <LogoComponent type="withText" />
      <LogoComponent type="withoutText" />
    </>
  );
};
render(<App />, document.getElementById("root"));
export default App;
