const { v4: uuidv4 } = require('uuid')

class Model {
    #id
    #created_at

    #errors = {}

    constructor() {
        this.#id = uuidv4()
        this.#created_at = new Date()
    }

    get id() {
        return this.#id
    }

    get created_at() {
        return this.#created_at
    }

    getRules() {
        return {}
    }

    getFields() {
        return {}
    }

    addError(attr, error) {
        if (!this.#errors[attr]) {
            this.#errors[attr] = []
        }

        this.#errors[attr].push(error)
    }

    validate(models) {
        this.#errors = {}
        const rules = this.getRules()

        for (let attr in rules) {
            const attrRules = rules[attr]
            const attrValue = this[attr]

            for (let i of attrRules) {
                if (i.rule instanceof RegExp) {
                    if (!i.rule.test(attrValue)) {
                        this.addError(attr, i.message)
                    }
                } else {
                    if (!i.rule(attrValue, models)) {
                        this.addError(attr, i.message)
                    }
                }
            }
        }

        return this.hasErrors()
    }

    hasErrors() {
        return Object.keys(this.#errors).length === 0;
    }

    getErrors(attr) {
        if (attr && this.#errors[attr]) {
            return this.#errors[attr]
        }

        return this.#errors
    }
}

module.exports = Model
