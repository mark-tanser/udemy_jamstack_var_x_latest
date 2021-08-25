export default function validate(values) {
    //input values = {field: value} eg: { email: contact@var-x.com }
    //output { field: valid } eg: { email: true }

    const validators = {
        email: val => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
        phone: val => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
        name: val => val.length > 3,
        message: val => val.length > 3,
    }

    const valid = {}

    Object.keys(values).map(field => {
        return valid[field] = validators[field](values[field])
    })

    return valid
}