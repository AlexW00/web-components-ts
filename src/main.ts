import ExampleComponent from "./components/ExampleComponent/ExampleComponent";
import WebComponentLoader from "./components/WebComponentLoader";
import { LiveValue } from "./data/LiveValue";
import ExampleModel from "./data/models/ExampleModel";

const exampleModel: ExampleModel = new ExampleModel("John", 0);

// Load all Web Components
WebComponentLoader.loadAll().then(() => {
	const exampleComponent: ExampleComponent = new ExampleComponent(
		exampleModel.getViewModel()
	);
	document.querySelector<HTMLDivElement>("#app")!.append(exampleComponent);

	exampleModel
		.getViewModel()
		.addEventListener(LiveValue.LIVE_DATA_CHANGED_EVENT, (data: any) => {
			console.log("MAIN ViewModel changed:", data);
		});
});
