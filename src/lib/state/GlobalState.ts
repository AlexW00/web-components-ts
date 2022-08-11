import State from "./State";
import DataManager from "../../data/DataManager";

// ====================================================== //
// ===================== GlobalState ===================== //
// ====================================================== //

// GlobalState is a singleton that should be used to store states, which are being shared by the entire application

// Usage:
// - Call GlobalState.init() at the start of the application to initialize states
// - Use GlobalState.addModel() to add states to the store
// - Use GlobalState.findModel(), GlobalState.findModels() and GlobalState.getModelById() retrieve states from the store

// Example:
// import GlobalState from "./data/GlobalState";
// GlobalState.init();
// GlobalState.addState(new State("hi there"));
// const retrievedState = GlobalState.findState(
// 	(state) => state.value === "hi there",
// 	string
// );

export default class GlobalState {
	private static _states: Map<string, State<any>> = new Map<
		string,
		State<any>
	>();

	// This function is used to initialize all states.
	// It should be called at the start of the application.
	public static async init() {
		const exampleModel = await DataManager.getExampleModel();
		this.addState(exampleModel.toState());
	}

	// Adds a state to the store.
	public static addState(state: State<any>): void {
		this._states.set(state.id, state);
	}

	// Returns a state from the store by its id.
	public static getStateById<T, S extends State<T>>(id: string): S | undefined {
		return this._states.get(id) as S;
	}

	// Returns a state from the store, that matches the given predicate.
	// Example: GlobalState.findModel(state => state.name === "John", ExampleModel)
	public static findState<T, S extends State<T>>(
		predicate: (value: T) => boolean,
		classConstructor: new (...args: any[]) => T
	): S | undefined {
		for (const state of this._states.values()) {
			if (state.value instanceof classConstructor && predicate(state.value)) {
				return state as S;
			}
		}
		return undefined;
	}

	// Returns all states from the store, that match the given predicate.
	// -> Like GlobalState.findModel(), but returns all matches.
	public static findStates<T, S extends State<T>>(
		predicate: (value: T) => boolean,
		classConstructor: new (...args: any[]) => T
	): S[] {
		const states: S[] = [];
		for (const state of this._states.values()) {
			if (state.value instanceof classConstructor && predicate(state.value)) {
				states.push(state as S);
			}
		}
		return states;
	}
}
