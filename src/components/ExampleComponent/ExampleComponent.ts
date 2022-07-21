import WebComponent from "../WebComponent";

// import the html and css files of the component
import css from "./ExampleComponent.css";
import html from "./ExampleComponent.html?raw"; // to import the html file, you must add "?raw" to the end of the path

export default class ExampleComponent extends WebComponent {
	// this is an example property, but you can define your own properties here
	someClassProperty: string = "Hello World";

	// the super constructor must be called with:
	// - the html of the component
	// - the css of the component (optional)
	// to get these values, you can import them from the html and css files (see import statements above)
	constructor() {
		super(html, css);
	}

	// override onConnected, to add listeners, set data, etc.
	onConnected(): void {
		// here we get the value of the attribute "name"
		// the attribute "name" is set in the html by <example-component name="..." />
		const name = this.getAttribute("name") || "";

		// now we set the text content of the component to the value of the attribute "name"
		this.root.querySelector("h1")!.innerHTML = `Hello ${name}!`;
	}

	// override htmlTagName to return the tag name our component
	// -> <example-component /> can be used in the html to create a new instance of this component
	get htmlTagName(): string {
		return "example-component";
	}
}
