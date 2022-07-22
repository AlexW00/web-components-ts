import { LiveValue } from "./LiveValue";
import Model from "./Model";

// ====================================================== //
// ====================== ViewModel ===================== //
// ====================================================== //

// Wrapper class to make any Model a LiveValue
// Use ViewModels in your application to change model values or listen to changes.

// Example:
// const exampleViewModel: ViewModel<ExampleModel> = exampleModel.getViewModel()
// exampleViewModel.addEventListener(LiveValue.LIVE_DATA_CHANGED_EVENT, (data: any) => {...}) // listen for model changes
// exampleViewModel.value = "new data" // set the model value (-> automatically notifies all listeners)
// console.log(exampleViewModel.value) // get the model value and print it (-> "new data")

export default class ViewModel<M extends Model> extends LiveValue<M> {
	constructor(model: M) {
		super(model);
	}
}
