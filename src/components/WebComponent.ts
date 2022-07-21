export default abstract class WebComponent extends HTMLElement {
	html: string;
	css: string | null;

	// css: string or null
	constructor(html: string, css: string | null) {
		super();
		this.html = html;
		this.css = css;
		this.attachShadow({ mode: "open" });
	}

	abstract onConnected(): void;

	abstract get htmlTagName(): string;

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
		template.innerHTML = this.html;
		this.root.appendChild(template.content.cloneNode(true));
	}
}
