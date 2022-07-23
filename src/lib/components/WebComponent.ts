// ====================================================== //
// ==================== WebComponent ==================== //
// ====================================================== //

// This class is used to create your custom web components.

// Usage:
// -> Example can be found in the src/components/ExampleComponent.ts

export default abstract class WebComponent extends HTMLElement {
	html: string;
	css: string;

	protected constructor(html?: string, css?: string) {
		super();
		this.html = html ?? "";
		this.css = css ?? "";
		this.attachShadow({ mode: "open" });
	}

	// Called, when the component is connected to the DOM
	// Override this method in your component to add listeners, set data, etc.
	abstract onConnected(): void;

	// Returns the HTML tag name of the component
	// Example: A component <example-component /> would return "example-component"
	abstract get htmlTagName(): string;

	// Wrapper for making dispatchEvent consistent with the Observer pattern
	protected notifyAll(eventName: string, data?: any) {
		const event = new CustomEvent(eventName, { detail: data });
		this.dispatchEvent(event);
	}

	// Returns the root element of the component
	get root(): ShadowRoot {
		if (this.shadowRoot) return this.shadowRoot;
		else throw new Error("WebComponent.root is not available yet");
	}

	// shortcut for this.root.querySelector(selector)
	select<E extends HTMLElement>(selector: string): E | null {
		return this.root.querySelector(selector);
	}

	// shortcut for this.root.querySelectorAll(selector)
	selectAll<E extends Element = Element>(selectors: string): NodeListOf<E> {
		return this.root.querySelectorAll(selectors);
	}

	async connectedCallback() {
		this.loadStylesheet();
		this.loadHtml();
		this.onConnected();
	}

	loadStylesheet() {
		if (this.css !== "") {
			const style = document.createElement("style");
			style.innerHTML = this.css;
			this.root.appendChild(style);
		}
	}

	loadHtml() {
		if (this.html !== "") {
			const template = document.createElement("template");
			template.innerHTML = this.html;
			this.root.appendChild(template.content.cloneNode(true));
		}
	}
}
