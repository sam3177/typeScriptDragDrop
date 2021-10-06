import Component from './Component.js';
import { ProjectStatus } from '../enums/ProjectStatus.js';
import Project from './Project.js';
import { state } from '../state/ProjectState.js';
export default class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.renderProjects = (projects) => {
            this.projectList.innerHTML = '';
            for (let project of projects) {
                new Project(project, this.projectList.id);
            }
        };
        this.dragOverHandler = (event) => {
            if (event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const list = this.element.querySelector('ul');
                list.classList.add('droppable');
            }
        };
        this.dropHandler = (event) => {
            event.preventDefault();
            const id = event.dataTransfer.getData('text/plain');
            const status = this.type === 'active'
                ? ProjectStatus.active
                : ProjectStatus.finished;
            state.moveProject(id, status);
        };
        this.dragLeaveHandler = (event) => {
            event.preventDefault();
            const list = this.element.querySelector('ul');
            list.classList.remove('droppable');
        };
        this.configure = () => {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
        };
        this.headerTitle = this.element.querySelector('h2');
        this.headerTitle.innerText = `${this.type.toUpperCase()} project list`;
        this.projectList = this.element.querySelector('ul');
        this.projectList.id = `${this.type}-list`;
        this.hostElement.append(this.element);
        state.addListener((projects) => {
            const relevantProjects = projects.filter((project) => project.status === ProjectStatus[this.type]);
            this.assignedProjects = relevantProjects;
            this.renderProjects(this.assignedProjects);
        });
        this.configure();
    }
    static getInstance(type) {
        if (this[type])
            return this[type];
        this[type] = new ProjectList(type);
        return this[type];
    }
}
//# sourceMappingURL=ProjectList.js.map