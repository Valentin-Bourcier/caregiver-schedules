import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import dates_fr from "./translations/fr/dates.json";
import dates_en from "./translations/en/dates.json";

i18next.init({
    interpolation: { escapeValue: false }, // React already does escaping
    react: {
        useSuspense: false
    },
    lng: "fr",
    resources: {
        fr: {
            dates: dates_fr
        },
        en: {
            dates: dates_en
        }
    }
});

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <App />
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
