import Component from './Component';
import { DragTarget } from '../interfaces/DragAndDrop';
import ProjectType from '../interfaces/ProjectType';
import { ProjectStatus } from '../enums/ProjectStatus';
import Project from './Project';
import {state} from '../state/ProjectState'

export default class ProjectList extends Component<
	HTMLDivElement,
	HTMLElement
> implements DragTarget {
	headerTitle: HTMLElement;
	projectList: HTMLUListElement;
	assignedProjects: ProjectType[] = [];
	private static active: ProjectList;
	private static finished: ProjectList;
	constructor (private type: 'active' | 'finished') {
		super('project-list', 'app', `${type}-projects`);

		this.headerTitle = this.element.querySelector(
			'h2',
		) as HTMLElement;
		this.headerTitle.innerText = `${this.type.toUpperCase()} project list`;
		this.projectList = this.element.querySelector(
			'ul',
		) as HTMLUListElement;
		this.projectList.id = `${this.type}-list`;
		this.hostElement.append(this.element);

		state.addListener((projects: ProjectType[]) => {
			const relevantProjects = projects.filter(
				(project) => project.status === ProjectStatus[this.type],
			);
			this.assignedProjects = relevantProjects;
			this.renderProjects(this.assignedProjects);
		});
		this.configure();
	}

	private renderProjects = (projects: ProjectType[]) => {
		this.projectList.innerHTML = '';
		for (let project of projects) {
			new Project(project, this.projectList.id);
		}
	};

	static getInstance (type: 'active' | 'finished'): ProjectList {
		if (this[type]) return this[type];
		this[type] = new ProjectList(type);
		return this[type];
	}
	dragOverHandler = (event: DragEvent) => {
		if (event.dataTransfer!.types[0] === 'text/plain') {
			event.preventDefault();
			const list = this.element.querySelector('ul')!;
			list.classList.add('droppable');
		}
	};

	dropHandler = (event: DragEvent) => {
		event.preventDefault();
		const id = event.dataTransfer!.getData('text/plain');
		const status =
			this.type === 'active'
				? ProjectStatus.active
				: ProjectStatus.finished;
		state.moveProject(id, status);
	};

	dragLeaveHandler = (event: DragEvent) => {
		event.preventDefault();
		const list = this.element.querySelector('ul')!;
		list.classList.remove('droppable');
	};

	configure = () => {
		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('drop', this.dropHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHandler);
	};
}
