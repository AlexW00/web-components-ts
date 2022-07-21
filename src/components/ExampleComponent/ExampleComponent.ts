import WebComponent from "../WebComponent";

import css from "./ExampleComponent.css";
import html from "./ExampleComponent.html?raw";

export default class ExampleComponent extends WebComponent {
	name: string = "";
	test: string = "test";

	constructor() {
		super(html, css);
	}

	get htmlTagName(): string {
		return "example-component";
	}

	onConnected(): void {
		this.name = this.getAttribute("name") || "";
		this.root.querySelector("h1")!.innerHTML = `Hello ${this.name}!`;
	}
}
