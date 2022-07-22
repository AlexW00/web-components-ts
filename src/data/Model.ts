import ViewModel from "./ViewModel";

// ====================================================== //
// ======================== Model ======================= //
// ====================================================== //

// A model is a basic data structure that can be used to store data.
// Extend it to create your own models. To get/set model values use ViewModels in your application.

export default abstract class Model {
	private _viewModel: ViewModel<this> | undefined;

	getViewModel(): ViewModel<this> {
		if (!this._viewModel) this._viewModel = new ViewModel(this);
		return this._viewModel;
	}
}
