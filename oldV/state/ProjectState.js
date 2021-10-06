import { ProjectStatus } from '../enums/ProjectStatus.js';
export default class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
        this.addListener = (listener) => {
            this.listeners.push(listener);
        };
        this.addProject = (title, description, people) => {
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
        this.moveProject = (id, status) => {
            this.projects = this.projects.map((project) => {
                if (project.id.toString() === id)
                    project.status = status;
                return project;
            });
            this.listenersLoop();
        };
        this.listenersLoop = () => {
            for (let listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        };
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }
}
export const state = ProjectState.getInstance();
//# sourceMappingURL=ProjectState.js.map