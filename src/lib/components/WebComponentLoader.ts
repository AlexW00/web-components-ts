import WebComponent from "./WebComponent";

// ====================================================== //
// ================= WebComponentLoader ================= //
// ====================================================== //

// This class is used to load all custom web components (otherwise they won't work).

// Usage:
// - Call WebComponentLoader.loadComponents().then(() => {...}) at the start of the application

export default class WebComponentLoader {
	private static componentDefinitions: ComponentDefinition<WebComponent>[] = [];

	public static async loadAll(): Promise<void> {
		const modules: GlobImport = import.meta.importGlob("../../components/**/*.ts");
		const modulePaths = Object.keys(modules);
		for (const modulePath of modulePaths) {
			const module = await modules[modulePath]();
			const componentClass = module.default;
			if (componentClass && componentClass.prototype.htmlTagName) {
				const componentDefinition = new ComponentDefinition(
					componentClass.prototype.htmlTagName,
					componentClass
				);
				WebComponentLoader.addComponentDefinition(componentDefinition);
			}
		}
		WebComponentLoader.defineAll();
	}

	private static addComponentDefinition(
		componentDefinition: ComponentDefinition<WebComponent>
	): void {
		this.componentDefinitions.push(componentDefinition);
	}

	private static defineAll(): void {
		this.componentDefinitions.forEach((componentDefinition) =>
			componentDefinition.defineSelf()
		);
	}
}

class ComponentDefinition<T extends WebComponent> {
	constructor(public name: string, public componentConstructor: new () => T) {}

	public defineSelf(): void {
		customElements.define(this.name, this.componentConstructor);
	}
}

// Helper type for the return value of the import.meta.importGlob() function
type GlobImport = {
	[key: string]: () => Promise<any>;
};
