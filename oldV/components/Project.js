import Component from './Component.js';
export default class Project extends Component {
    constructor(project, hostId) {
        super('single-project', hostId, project.id.toString());
        this.project = project;
        this.compose = () => {
            const { title, description, people } = this.project;
            this.element.querySelector('h2').innerHTML = title;
            this.element.querySelector('h3').innerHTML = `Assigned to ${people.toString()} ${this
                .persons}.`;
            this.element.querySelector('p').innerHTML = description;
        };
        this.dragStartHandler = (event) => {
            event.dataTransfer.setData('text/plain', this.project.id.toString());
            event.dataTransfer.effectAllowed = 'move';
        };
        this.dragEndHandler = (_event) => { };
        this.configure = () => {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        };
        this.element.className = 'project';
        this.compose();
        this.configure();
    }
    get persons() {
        return this.project.people === 1 ? 'person' : 'persons';
    }
}
//# sourceMappingURL=Project.js.map