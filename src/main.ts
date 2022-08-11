import ExampleComponent from "./components/ExampleComponent/ExampleComponent";
import WebComponentLoader from "./lib/components/WebComponentLoader";
import State from "./lib/state/State";
import ExampleModel from "./data/models/ExampleModel";
import GlobalState from "./lib/state/GlobalState";
import DataManager from "./data/DataManager";

const app = () => {
	"use strict";

	WebComponentLoader.loadAll() // Initialize the WebComponent definitions
		.then(() => DataManager.init()) // Initialize the database connection etc.
		.then(() => GlobalState.init()) // Initialize the global state
		.then(() => onApplicationStart()); // Start the application

	function onApplicationStart() {
		// retrieve the example ViewModel from the model store
		const exampleState = GlobalState.findState(
				(exampleModel) => exampleModel.name === "John",
				ExampleModel
			)!,
			// create the example component and append it to the body
			exampleComponent: ExampleComponent = new ExampleComponent(exampleState);
		document.querySelector<HTMLDivElement>("#app")!.append(exampleComponent);

		// listen to any changes on the exampleModel
		exampleState.addEventListener(State.STATE_CHANGE_EVENT, (data: any) => {
			console.log("MAIN ViewModel changed:", data);
			console.log(GlobalState);
		});
	}
};

app();
