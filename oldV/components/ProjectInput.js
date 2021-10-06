import Component from "./Component.js";
import validate from '../helpers/validateFn.js';
import { state } from '../state/ProjectState.js';
export default class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', 'user-input');
        this.submitHandler = (event) => {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                state.addProject(...userInput);
                this.clearInputs();
            }
        };
        this.clearInputs = () => {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        };
        this.configure = () => {
            this.element.addEventListener('submit', this.submitHandler);
        };
        this.gatherUserInput = () => {
            if (validate({
                value: this.titleInputElement.value,
                required: true,
                maxLength: 20,
            }) &&
                validate({
                    value: this.descriptionInputElement.value,
                    required: true,
                    minLength: 8,
                }) &&
                validate({
                    value: this.peopleInputElement.value,
                    required: true,
                    min: 0,
                })) {
                return [
                    this.titleInputElement.value,
                    this.descriptionInputElement.value,
                    +this.peopleInputElement.value,
                ];
            }
            else {
                alert('Invalid input, please try again!');
            }
        };
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.hostElement.append(this.element);
        this.configure();
    }
}
//# sourceMappingURL=ProjectInput.js.map