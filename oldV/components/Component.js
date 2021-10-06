export default class Component {
    constructor(templateId, hostId, elementId) {
        this.renderElement = () => {
            this.hostElement.append(this.element);
        };
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (elementId)
            this.element.id = elementId;
        this.renderElement();
    }
}
//# sourceMappingURL=Component.js.map