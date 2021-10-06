import Component from './Component';
import { Draggable } from '../interfaces/DragAndDrop';
import ProjectType from '../interfaces/ProjectType';

export default class Project extends Component<
	HTMLUListElement,
	HTMLLIElement
> implements Draggable {
	get persons (): string {
		return this.project.people === 1 ? 'person' : 'persons';
	}
	constructor (private project: ProjectType, hostId: string) {
		super('single-project', hostId, project.id.toString());
		this.element.className = 'project';
		this.compose();
		this.configure();
	}
	compose = (): void => {
		const { title, description, people } = this.project;
		this.element.querySelector('h2')!.innerHTML = title;
		this.element.querySelector(
			'h3',
		)!.innerHTML = `Assigned to ${people.toString()} ${this
			.persons}.`;
		this.element.querySelector('p')!.innerHTML = description;
	};
	dragStartHandler = (event: DragEvent) => {
		event.dataTransfer!.setData(
			'text/plain',
			this.project.id.toString(),
		);
		event.dataTransfer!.effectAllowed = 'move';
	};
	dragEndHandler = (_event: DragEvent) => {};
	configure = () => {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	};
}
