import { ProjectStatus } from '../enums/ProjectStatus';

export default interface ProjectType {
	id: number;
	title: string;
	description: string;
	people: number;
	status: ProjectStatus;
};
