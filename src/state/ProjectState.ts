import ProjectType from '../interfaces/ProjectType';
import {ProjectStatus} from '../enums/ProjectStatus';

export default class ProjectState {
	private projects: ProjectType[] = [];
	private listeners: Function[] = [];
	private static instance: ProjectState;

	addListener = (listener: Function) => {
		this.listeners.push(listener);
	};

	addProject = (
		title: string,
		description: string,
		people: number,
	) => {
		const newProject = {
			id: Math.floor(Math.random() * 10000),
			title,
			description,
			people,
			status: ProjectStatus.active,
		};
		this.projects.push(newProject);
		this.listenersLoop();
	};
	moveProject = (id: string, status: ProjectStatus): void => {
		this.projects = this.projects.map((project) => {
			if (project.id.toString() === id) project.status = status;
			return project;
		});
		this.listenersLoop();
	};
	private listenersLoop = (): void => {
		for (let listenerFn of this.listeners) {
			listenerFn(this.projects.slice());
		}
	};

	static getInstance (): ProjectState {
		if (this.instance) return this.instance;
		this.instance = new ProjectState();
		return this.instance;
	}
}
export const state = ProjectState.getInstance();