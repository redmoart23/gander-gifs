import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import StarGame from "./StarGame";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StarGame />
  </StrictMode>
);
