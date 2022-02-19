export default function validate(values) {
    //input values = {field: value} eg: { email: contact@var-x.com }
    //output { field: valid } eg: { email: true }

    const validators = {
        email: val => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val),
        phone: val => /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(val),
        name: val => val.length > 3,
        message: val => val.length > 3,
        password: val => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        confirmation: val => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val),
        //street: val => /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/.test(val),
        //for Safari to work, I needed to replace with this instead...
        street: val => /^(?=.*[A-Za-z])(?=.*\d)(?!.*[^A-Za-z0-9\-#\.\/ ])/.test(val),
        zip: val => /^\d{5}(-\d{4})?$/.test(val),
        promo: val => true,
        city: val => val.length !== 0,
        state: val => val.length !== 0
    }

    const valid = {}

    Object.keys(values).map(field => {
        return valid[field] = validators[field](values[field])
    })

    return valid
}