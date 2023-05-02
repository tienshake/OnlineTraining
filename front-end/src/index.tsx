import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store/store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ChatBoxState from "./context/chatbot/ChatBotState";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChatBoxState>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AX5NzE6nfdlpQfU5wPDtdwfldh6pKntibm1CM4X6fFqu7AYWTCNIODvFIE7swvMQBtjSHu7crjJdRhf8",
          }}
        >
          <App />
        </PayPalScriptProvider>
      </ChatBoxState>

    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
