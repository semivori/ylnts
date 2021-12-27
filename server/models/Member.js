const Model = require('./Model')

class Member extends Model {
    name
    email

    getRules() {
        return {
            name: [
                {
                    rule: /^[a-z]{1}[a-z ]{1,}$/i,
                    message: 'name must be at least 2 symbols and can contain only Latin letters and a space',
                }
            ],
            email: [
                {
                    rule: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                    message: 'email address is invalid',
                },
                {
                    rule(v, models) {
                        return models.findIndex(i => i.email === v) === -1
                    },
                    message: 'this email address has already been taken',
                }
            ]
        }
    }

    constructor(name, email) {
        super()

        this.name = name
        this.email = email
    }

    getFields() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            created_at: this.created_at,
        }
    }
}

module.exports = Member
