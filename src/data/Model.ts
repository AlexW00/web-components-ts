import ViewModel from "./ViewModel";

export default abstract class Model {
	getViewModel(): ViewModel<this> {
		return new ViewModel(this);
	}
}
