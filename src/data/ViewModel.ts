import { LiveValue } from "./LiveValue";
import Model from "./Model";

export default class ViewModel<M extends Model> extends LiveValue<M> {
	constructor(model: M) {
		super(model);
	}
}
