import State from "../state/State";

// ====================================================== //
// ======================== Model ======================= //
// ====================================================== //

// A model is a basic data structure that can be used to store data.
// Extend it to create your own models. To get/set model values use States (DO NOT USE RAW MODELS) in your application.

export default abstract class Model {

	private _state: State<this> | undefined;

	toState(): State<this> {
		if (!this._state) this._state = new State(this);
		return this._state;
	}
}
