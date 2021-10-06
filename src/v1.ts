// //validatable interface
// interface Validatable {
// 	value: string;
// 	required?: boolean;
// 	minLength?: number;
// 	maxLength?: number;
// 	min?: number;
// 	max?: number;
// }
// type ProjectType =[
//    title:string,
//    description:string,
//    people: number
// ]

// //validate fn
// const validate = (vInput: Validatable): boolean => {
// 	let isValid = true;
// 	if (vInput.required) {
// 		if (vInput.value.trim().length === 0) isValid = false;
// 	}
// 	if (vInput.minLength) {
// 		if (vInput.value.trim().length <= vInput.minLength)
// 			isValid = false;
// 	}
// 	if (vInput.maxLength) {
// 		if (vInput.value.trim().length >= vInput.maxLength)
// 			isValid = false;
// 	}
// 	if (vInput.min) {
// 		if (+vInput.value.trim() <= vInput.min) isValid = false;
// 	}
// 	if (vInput.max) {
// 		if (+vInput.value.trim() >= vInput.max) isValid = false;
// 	}
// 	// return isValid;
// };

// //project class
// class Project {
//    templateElement: HTMLTemplateElement;
// 	hostElement: HTMLUListElement;
//    element: HTMLElement
//    constructor ([title, description, people]:ProjectType) {
      
// 		this.templateElement = document.getElementById(
// 			'single-project',
// 		) as HTMLTemplateElement;
// 		this.hostElement = document.getElementById(
// 			'active-list',
// 		) as HTMLUListElement;
// 		const importedNode = document.importNode(
// 			this.templateElement.content,
// 			true,
// 		);
// 		this.element = importedNode.firstElementChild as HTMLLIElement;
// 		this.element.className = 'project';
//       this.element.innerHTML = `
//          <h4>${title}</h4>
//          <p>${description}</p>
//          <p>${people}</p>
//       `
	
// 		this.hostElement.append(this.element);
// 		// this.configure();

// 	}
// }

// // project list class
// class ProjectList {
//    templateElement: HTMLTemplateElement;
// 	hostElement: HTMLDivElement;
//    element: HTMLElement
//    headerTitle: HTMLElement;
//    projectList: HTMLUListElement;
//    private static active: ProjectList;
//    private static finished: ProjectList;
//    constructor (private type:'active' | 'finished') {
// 		this.templateElement = document.getElementById(
// 			'project-list',
// 		) as HTMLTemplateElement;
// 		this.hostElement = document.getElementById(
// 			'app',
// 		) as HTMLDivElement;
// 		const importedNode = document.importNode(
// 			this.templateElement.content,
// 			true,
// 		);
// 		this.element = importedNode.firstElementChild as HTMLElement;
// 		this.element.id = `${this.type}-projects`;
// 		this.headerTitle = this.element.querySelector(
// 			'h2',
// 		) as HTMLElement;
//       this.headerTitle.innerText = `${this.type.toUpperCase()} project list`
// 		this.projectList = this.element.querySelector(
// 			'ul'
// 		) as HTMLUListElement;
// 		this.projectList.id = `${this.type}-list`
// 		this.hostElement.append(this.element);
// 	}
//    static getInstance(type:'active' | 'finished'): ProjectList{
// 		if(this[type]) return this[type]
// 		this[type] = new ProjectList(type)
// 		return this[type]
// 	}
// }

// // project input class
// class ProjectInput {
// 	templateElement: HTMLTemplateElement;
// 	hostElement: HTMLDivElement;
// 	element: HTMLFormElement;
// 	titleInputElement: HTMLInputElement;
// 	descriptionInputElement: HTMLInputElement;
// 	peopleInputElement: HTMLInputElement;
// 	constructor () {
// 		this.templateElement = document.getElementById(
// 			'project-input',
// 		) as HTMLTemplateElement;
// 		this.hostElement = document.getElementById(
// 			'app',
// 		) as HTMLDivElement;
// 		const importedNode = document.importNode(
// 			this.templateElement.content,
// 			true,
// 		);
// 		this.element = importedNode.firstElementChild as HTMLFormElement;
// 		this.element.id = 'user-input';
// 		this.titleInputElement = this.element.querySelector(
// 			'#title',
// 		) as HTMLInputElement;
// 		this.descriptionInputElement = this.element.querySelector(
// 			'#description',
// 		) as HTMLInputElement;
// 		this.peopleInputElement = this.element.querySelector(
// 			'#people',
// 		) as HTMLInputElement;
// 		this.hostElement.append(this.element);
// 		this.configure();
// 	}
// 	private submitHandler = (event: Event) => {
// 		event.preventDefault();
// 		const userInput = this.gatherUserInput();
// 		if (Array.isArray(userInput)) {
// 			console.log(userInput);
//          ProjectList.getInstance('active')
//          ProjectList.getInstance('finished')
//          new Project(userInput)
// 			this.clearInputs();
// 		}
// 	};
// 	private clearInputs = () => {
// 		this.titleInputElement.value = '';
// 		this.descriptionInputElement.value = '';
// 		this.peopleInputElement.value = '';
// 	};
// 	private configure = () => {
// 		this.element.addEventListener('submit', this.submitHandler);
// 	};
// 	private gatherUserInput = (): [string, string, number] | void => {
// 		if (
// 			validate({
// 				value: this.titleInputElement.value,
// 				required: true,
// 				maxLength: 20,
// 			}) &&
// 			validate({
// 				value: this.descriptionInputElement.value,
// 				required: true,
// 				minLength: 10,
// 			}) &&
// 			validate({
// 				value: this.peopleInputElement.value,
// 				required: true,
// 				min: 2,
// 			})
// 		) {
// 			return [
// 				this.titleInputElement.value,
// 				this.descriptionInputElement.value,
// 				+this.peopleInputElement.value,
// 			];
// 		} else {
// 			alert('Invalid input, please try again!');
// 		}
// 	};
// }

// //project input instance
// const projectInput = new ProjectInput();
