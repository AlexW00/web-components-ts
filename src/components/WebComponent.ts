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
		const innerHTML = this.createInnerHtml();
		template.innerHTML = innerHTML;
		this.root.appendChild(template.content.cloneNode(true));
	}

	private createInnerHtml(): string {
		// replace any ${...} with the value of the attribute with the same name
		return this.html.replace(/"\$\{([^}]*)\}"/g, (_, name: string) => {
			// @ts-ignore
			const value = this[name];
			if (value) {
				if (typeof value == "string" || typeof value == "number")
					return `"${value}"`;
				else
					console.error(
						`Property ${name} of ${this.constructor.name} is not a string or number`
					);
			} else
				console.error(
					`Property ${name} is not defined in ${this.constructor.name}`
				);
			return '""';
		});
	}
}
