import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBolt,
  faCircleArrowUp,
  faCircleArrowDown,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
library.add(faBolt, faCircleArrowUp, faCircleArrowDown, faClock);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
