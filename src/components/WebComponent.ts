// ====================================================== //
// ==================== WebComponent ==================== //
// ====================================================== //

// This class is used to create your custom web components.

// Usage:
// -> Example can be found in the src/components/ExampleComponent.ts

export default abstract class WebComponent extends HTMLElement {
	html: string;
	css: string | undefined;

	constructor(html: string, css?: string) {
		super();
		this.html = html; // the html of the component
		this.css = css; // css is optional
		this.attachShadow({ mode: "open" });
	}

	// Called, when the component is connected to the DOM
	// Override this method in your component to add listeners, set data, etc.
	abstract onConnected(): void;

	// Returns the HTML tag name of the component
	// Example: A component <example-component /> would return "example-component"
	abstract get htmlTagName(): string;

	// Returns the root element of the component
	get root(): ShadowRoot {
		if (this.shadowRoot) return this.shadowRoot;
		else throw new Error("WebComponent.root is not available yet");
	}

	async connectedCallback() {
		this.loadStylesheet();
		this.loadHtml();
		this.onConnected();
	}

	async loadStylesheet() {
		if (this.css) {
			const style = document.createElement("style");
			style.innerHTML = this.css;
			this.root.appendChild(style);
		}
	}

	async loadHtml() {
		const template = document.createElement("template");
		const innerHTML = this.createInnerHtml();
		template.innerHTML = innerHTML;
		this.root.appendChild(template.content.cloneNode(true));
	}

	// Returns the inner HTML of the component
	// Replaces all placeholders "${...}" with the values of the class properties
	private createInnerHtml(): string {
		// replace any ${...} with the value of the attribute with the same name
		return this.html.replace(/\$\{([^}]*)\}/g, (_, name: string) => {
			// @ts-ignore
			const value = this[name];
			if (value) {
				if (typeof value == "string" || typeof value == "number")
					return `${value}`;
				else
					console.error(
						`Property ${name} of ${this.constructor.name} is not a string or number`
					);
			} else
				console.error(
					`Property ${name} is not defined in ${this.constructor.name}`
				);
			return "";
		});
	}
}
