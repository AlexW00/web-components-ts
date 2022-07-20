import WebComponent from "../WebComponent";

import css from "./ExampleComponent.css";
import html from "./ExampleComponent.html?raw";

export default class ExampleComponent extends WebComponent {
	name: string = "";

	constructor() {
		super(html, css);
	}

	onConnected(): void {
		console.log("ExampleComponent connected");
		this.name = this.getAttribute("name") || "";
		this.root.querySelector("h1")!.innerHTML = `Hello ${this.name}!`;
	}
}

customElements.define("example-component", ExampleComponent);
