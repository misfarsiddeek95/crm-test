import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      // The correct prop in Mantine v7 is 'defaultColorScheme'
      defaultColorScheme="auto"
      theme={{}}
    >
      <App />
    </MantineProvider>
  </React.StrictMode>
);
