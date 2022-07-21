import ViewModel from "./ViewModel";

export default abstract class Model {
	private _viewModel: ViewModel<this> | undefined;

	getViewModel(): ViewModel<this> {
		if (!this._viewModel) this._viewModel = new ViewModel(this);
		return this._viewModel;
	}
}
