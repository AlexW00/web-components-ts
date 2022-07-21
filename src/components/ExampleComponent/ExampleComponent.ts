import { LiveValue } from "../../data/LiveValue";
import ExampleModel from "../../data/models/ExampleModel";
import ViewModel from "../../data/ViewModel";
import WebComponent from "../WebComponent";

// ====================================================== //
// ================== ExampleComponent ================== //
// ====================================================== //

// import the html and css files of the component
import css from "./ExampleComponent.css";
import html from "./ExampleComponent.html?raw"; // to import html files, you must add "?raw" to the end of the path

export default class ExampleComponent extends WebComponent {
	someClassProperty: string = "Hello World";

	testViewModel: ViewModel<ExampleModel> = new ExampleModel(
		"test",
		42
	).getViewModel();

	testLiveValue: LiveValue<number> = new LiveValue(0);

	testLiveArray: LiveValue<Array<number>> = new LiveValue([]);

	testLiveObjectNested: LiveValue<any> = new LiveValue({
		test: "test",
		nest1: {
			nest2: {
				nest3: "test",
			},
		},
	});

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

		this.root.querySelector("p")!.addEventListener("click", () => {
			console.log("clicked");
			this.testViewModel.value.p1 = "test";
		});

		this.root.querySelector("h1")!.addEventListener("click", () => {
			console.log("clicked");
			this.testLiveObjectNested.value.nest1 =
				this.testLiveObjectNested.value.nest1 + "x";
		});

		this.testLiveObjectNested.addEventListener("change", (data: any) => {
			console.log("changed", data);
		});
	}

	// override htmlTagName to return the tag name our component
	// -> <example-component /> can be used in the html to create a new instance of this component
	get htmlTagName(): string {
		return "example-component";
	}
}
