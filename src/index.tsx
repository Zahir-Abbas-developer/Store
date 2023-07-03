import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./sass/common.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider,  } from "antd";
import { theme } from "./theme/theme";
import './sass/common.scss';

import { Provider } from "react-redux";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const persistor = persistStore(store);

root.render(
  
    <BrowserRouter>
      <ConfigProvider theme={theme}>
      <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <PayPalScriptProvider options={{ "client-id": "Ab2KAInp7PNa0-l_lvMhvH_nuFmIpU6aMxnGGEE2bBzJkJGDe9-DLgXI4lkD_rpB5cBDd1SjQypZ1-d7", components:"buttons",currency:"USD",intent:"capture" }}>
    <App />
  </PayPalScriptProvider>,
    
    </PersistGate>
  </Provider>,
      </ConfigProvider>
    </BrowserRouter>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
