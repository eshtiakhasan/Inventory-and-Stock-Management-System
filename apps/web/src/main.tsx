import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App, createQueryClient } from "./App";
import "./styles/tokens.css";
import "./styles/base.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Mojud: the #root element is missing from index.html");
}

createRoot(container).render(
  <StrictMode>
    <App queryClient={createQueryClient()} />
  </StrictMode>,
);
