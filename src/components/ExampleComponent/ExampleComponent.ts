import WebComponent from "../WebComponent";

import css from "./ExampleComponent.css";
import html from "./ExampleComponent.html?raw";

export default class ExampleComponent extends WebComponent {
	name: string = "";
	test: string = "test";

	constructor() {
		console.log("ExampleComponent constructor");
		super(html, css);
	}

	onConnected(): void {
		this.name = this.getAttribute("name") || "";
		this.root.querySelector("h1")!.innerHTML = `Hello ${this.name}!`;
		this.root.querySelector("p")!.addEventListener("click", this.onClickP);
	}

	onClickP = () => {
		console.log("click");
	};

	get htmlTagName(): string {
		return "example-component";
	}
}
