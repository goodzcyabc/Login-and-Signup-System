import validator from "validator"
import isEmpty from "lodash/isEmpty"

const validatorInput = (data) =>{
    /**
     * validator.isEmpty Method justifies if it is null
     */
    let errors = {}
    if(validator.isEmpty(data.username)){
        errors.username = "Username cannot be empty!"
    }
    if(validator.isEmpty(data.password)){
        errors.password = "Password cannot be empty!"
    }
  
    return{
        //if value is null, return true; else return false.
        isValid:!isEmpty(errors),
        errors
    }
}

export default validatorInput