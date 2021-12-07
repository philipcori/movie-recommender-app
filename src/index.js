import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import Amplify from "aws-amplify";
import { Constants } from "./util/Constants";
Amplify.configure({
  API: {
    endpoints: [
      {
        name: Constants.API,
        // endpoint: "https://e5q3z9uoq9.execute-api.us-west-2.amazonaws.com/dev",
        endpoint: "http://localhost:5000",
      },
    ],
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
