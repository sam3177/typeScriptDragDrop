import Component from "./Component";
import validate from '../helpers/validateFn'
import {state} from '../state/ProjectState'


export default class ProjectInput extends Component<
HTMLDivElement,
HTMLFormElement
> {
titleInputElement: HTMLInputElement;
descriptionInputElement: HTMLInputElement;
peopleInputElement: HTMLInputElement;
constructor () {
   super('project-input', 'app', 'user-input');

   this.titleInputElement = this.element.querySelector(
      '#title',
   ) as HTMLInputElement;
   this.descriptionInputElement = this.element.querySelector(
      '#description',
   ) as HTMLInputElement;
   this.peopleInputElement = this.element.querySelector(
      '#people',
   ) as HTMLInputElement;
   this.hostElement.append(this.element);
   this.configure();
}
private submitHandler = (event: Event) => {
   event.preventDefault();
   const userInput = this.gatherUserInput();
   if (Array.isArray(userInput)) {
      state.addProject(...userInput);
      this.clearInputs();
   }
};
private clearInputs = () => {
   this.titleInputElement.value = '';
   this.descriptionInputElement.value = '';
   this.peopleInputElement.value = '';
};
private configure = () => {
   this.element.addEventListener('submit', this.submitHandler);
};
private gatherUserInput = (): [string, string, number] | void => {
   if (
      validate({
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
      })
   ) {
      return [
         this.titleInputElement.value,
         this.descriptionInputElement.value,
         +this.peopleInputElement.value,
      ];
   } else {
      alert('Invalid input, please try again!');
   }
};
}