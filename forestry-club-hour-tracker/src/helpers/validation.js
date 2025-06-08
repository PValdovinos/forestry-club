import { MAX_NAME_LENGTH, MAX_EMAIL_LENGTH, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "../projectVariables"

export const validateName = (name, type) => {
    name = name.trim()

    if(name === "") {
        return {
            isValid: false,
            message: `Please enter your ${type} name`
        }
    }

    if(name.length >= MAX_NAME_LENGTH) {
        return {
            isValid: false,
            message: `Please enter a ${type} name less than ${MAX_NAME_LENGTH} characters`
        }
    }

    return {
        isValid: true,
        message: ''
    }
}

export const validateEmail = email => {
    email = email.trim()
    const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    if(email === '') {
        return {
            isValid: false,
            message: 'Please enter your email'
        }
    }

    if(email.length >= MAX_EMAIL_LENGTH) {
        return {
            isValid: false,
            message: `Please enter an email less than ${MAX_EMAIL_LENGTH} characters`
        }
    }

    if(!pattern.test(email)) {
        return {
            isValid: false,
            message: 'Please enter an email with this format: myemail@example.com'
        }
    }

    return {
        isValid: true,
        message: ''
    }
}

export const validatePassword = password => {
    password = password.trim()

    if(password === '') {
        return {
            isValid: false,
            message: 'Please enter a password'
        }
    }

    if(!(password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH)) {
        return {
            isValid: false,
            meesage: `Please enter a password of ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters`
        }
    }

    return {
        isValid: true,
        message: ''
    }
}