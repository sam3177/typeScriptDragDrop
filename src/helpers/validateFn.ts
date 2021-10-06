import Validatable from "../interfaces/Validatable";

const validate = (vInput: Validatable): boolean => {
	let isValid = true;
	if (vInput.required) {
		if (vInput.value.trim().length === 0) isValid = false;
	}
	if (vInput.minLength) {
		if (vInput.value.trim().length <= vInput.minLength)
			isValid = false;
	}
	if (vInput.maxLength) {
		if (vInput.value.trim().length >= vInput.maxLength)
			isValid = false;
	}
	if (vInput.min) {
		if (+vInput.value.trim() <= vInput.min) isValid = false;
	}
	if (vInput.max) {
		if (+vInput.value.trim() >= vInput.max) isValid = false;
	}
	return isValid;
};

export default validate