

//Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_NOT_VALID_ERROR_MESSAGE = 'The email is not valid.';
const TEXT_EMPTY_ERROR_MESSAGE = 'The field is required.'

/**
 * Compose function for validation methods.
 * 
 * @param  {...any} fns 
 */
export const compose = (...fns) => fns.reduceRight((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)), data => data);

/**
 * Email pure function validator to be used in the compose method.
 * 
 * @param {*} data 
 */
export const emailValidator = (data) => {
    return data.error || _isEmailValid(data.text) ? data : (data = { error: true, errorMessage: EMAIL_NOT_VALID_ERROR_MESSAGE });
}

/**
 * Empty text pure function validator to be used in the compose method.
 * 
 * @param {*} data 
 */
export const emptyTextValidator = (data) => {
    return data.error || !_isTextEmpty(data.text) ? data : (data = { error: true, errorMessage: TEXT_EMPTY_ERROR_MESSAGE })
}

const _isEmailValid = (email) => {
    return _isTextEmpty(email) ? true : EMAIL_REGEX.test(email)
}

const _isTextEmpty = (text) => {
    return text === "";
}
