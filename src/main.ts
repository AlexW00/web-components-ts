import ExampleComponent from "./components/ExampleComponent/ExampleComponent";
import WebComponentLoader from "./lib/components/WebComponentLoader";
import { LiveValue } from "./lib/data/LiveValue";
import ExampleModel from "./data/models/ExampleModel";
import ModelStore from "./lib/data/ModelStore";

WebComponentLoader.initComponentDefinitions() // Initialize the WebComponent definitions
	.then(() => ModelStore.initModels()) // Initialize the model store
	.then(() => onApplicationStart()); // Start the application

function onApplicationStart() {
	// retrieve the example ViewModel from the model store
	const exampleViewModel = ModelStore.findModel(
		(model) => model.name === "John",
		ExampleModel
	)!.getViewModel();

	// create the example component and append it to the body
	const exampleComponent: ExampleComponent = new ExampleComponent(
		exampleViewModel
	);
	document.querySelector<HTMLDivElement>("#app")!.append(exampleComponent);

	// listen to any changes on the exampleViewModel
	exampleViewModel.addEventListener(
		LiveValue.LIVE_DATA_CHANGED_EVENT,
		(data: any) => {
			console.log("MAIN ViewModel changed:", data);
			console.log(ModelStore);
		}
	);
}
