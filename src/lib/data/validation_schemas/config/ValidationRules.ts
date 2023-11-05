import json from "./validation_rules.json"

interface IValidationRules {
    minUsernameLength: number;
    maxUsernameLength: number;
    minPasswordLength: number;
    maxPasswordLength: number;
}

const validationRules: IValidationRules = json as IValidationRules;

export default validationRules;
