import ExampleModel from "../../data/models/ExampleModel";
import WebComponent from "../../lib/components/WebComponent";

// ====================================================== //
// ================== ExampleComponent ================== //
// ====================================================== //

// import the html and css files of the component
import css from "./ExampleComponent.css";
import html from "./ExampleComponent.html";
import State from "../../lib/state/State";

export default class ExampleComponent extends WebComponent {
	exampleState: State<ExampleModel>;

	// the super constructor must be called with:
	// - the html of the component (optional) -> if not provided, an empty <template> will be created
	// - the css of the component (optional) -> if not provided, no style will be added to the component
	// to get these values, you can import them from the html and css files (see import statements above)
	constructor(exampleState: State<ExampleModel>) {
		super(html, css);
		this.exampleState = exampleState;
	}

	// override htmlTagName to return the tag name our component
	// -> <example-component /> can be used in the html to create a new instance of this component
	get htmlTagName(): string {
		return "example-component";
	}

	// override onConnected, to add listeners, set data, etc.
	// -> this method is called, when the component is connected to the DOM
	onConnected(): void {
		// select the element using querySelector and set the value of the element
		this.root.querySelector(
			"h1"
		)!.innerHTML = `Hello ${this.exampleState.value.name}!`;

		// alternatively, you can use the this.select(selector) shortcut to get the element
		this.select("#count")!.innerHTML = `${this.exampleState.value.count}`;

		// set the listeners for the button and the view model
		this.select("button")!.addEventListener("click", this.onButtonClicked);

		this.exampleState.addEventListener("change", this.onViewModelChanged);
	}

	// this method is called, when the button is clicked
	onButtonClicked = () => {
		this.exampleState.value.count++;
	};

	// this method is called, when the view model changes
	// -> we need to update our component with the new values
	onViewModelChanged = (data: any) => {
		this.select("#count")!.innerHTML = `${this.exampleState.value.count}`;
		console.log("COMPONENT ViewModel changed:", data);
	};
}
