import WebComponent from "../WebComponent";

import css from "./ExampleComponent.css";
import html from "./ExampleComponent.html?raw";

export default class ExampleComponent extends WebComponent {
	name: string = "";

	constructor() {
		console.log("ExampleComponent constructor");
		super(html, css);
	}

	onConnected(): void {
		this.name = this.getAttribute("name") || "";
		this.root.querySelector("h1")!.innerHTML = `Hello ${this.name}!`;
	}

	get htmlTagName(): string {
		return "example-component";
	}
}
