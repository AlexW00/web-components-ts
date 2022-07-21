import "./style.css";
import WebComponentLoader from "./components/WebComponentLoader";

WebComponentLoader.loadAll();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <example-component name="Vite"></example-component>

`;
