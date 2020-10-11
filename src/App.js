import React from "react";
import { Provider } from "react-redux";

import Routes from "./routes";
import store from "./store";
// import GlobalStyles from "./styles/global";

const App = () => {
  return (
    <Provider store={store}>
      {/* <GlobalStyles /> */}
      <Routes />
    </Provider>
  );
};

export default App;
