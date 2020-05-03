const MessageEnum = require('./message-enum')
const Message = require('./message')

module.exports = {
    requiredAndValidSize: (field, label, size) => {
        if (field === null || field === '' || field === undefined || field.length === 0) {
            return Message.createMessageError(MessageEnum.ERR_REQUIRED + label, '');
        } else if (field.length > size) {
            return this.maximumNumberCharacters(field, label, size);
        } else {
            return true;
        }
    },

    fullName: (name, label) => {
        let names = [];
        if (name !== null && name !== '' && name !== undefined) {
            names = name.split(' ');
            if (names.length < 2) {
                return Message.createMessageError(MessageEnum.ERR_INV_LASTNAME + label, '');
            }
            return true;
        }
        return true;
    },

    nameHasValidCharacters: (value, label) => {
        if (value !== null && value !== '' && value !== undefined) {
            const regex = /^[a-záàâãéèêíïóôõöúçñ.'` ]+$/img;
            if (!regex.test(value)) {
                return Message.createMessageError(MessageEnum.ERR_INVCHR + label, value);
            }
            return true;
        }
        return true;
    },

    cpf: (cpf, label) => {
        if (cpf) {
            const CPF_WEIGHT = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            const REGEX_CPF = '^[0-9]*$';

            if (cpf === '' || cpf.length < 11) {
                return Message.createMessageError(MessageEnum.ERR_INV + label, cpf);
            }

            if (!cpf.match(REGEX_CPF)) {
                return Message.createMessageError(MessageEnum.ERR_INVCHR + label, cpf);
            }

            // check if all chacacteres are equals
            if (cpf.split('').every(char => char === cpf[0])) {
                return Message.createMessageError(MessageEnum.ERR_INV + label, cpf);
            }

            const digit1 = this.calculateDigit(cpf.substring(0, 9), CPF_WEIGHT);
            const digit2 = this.calculateDigit(cpf.substring(0, 9) + digit1, CPF_WEIGHT);
            const validatedCpf = cpf.substring(0, 9) + digit1 + digit2;

            if (validatedCpf === cpf) {
                return true;
            } else {
                return Message.createMessageError(MessageEnum.ERR_INV + label, cpf);
            }
        } else {
            return false;
        }
    },

    calculateDigit: (cpf, weight) => {
        let sum = 0;
        for (let i = cpf.length - 1, digit; i >= 0; i--) {
            digit = cpf.substring(i, i + 1);
            sum += digit * weight[weight.length - cpf.length + i];
        }
        sum = 11 - sum % 11;
        return sum > 9 ? 0 : sum;
    },

    email(email, label) {
        if (!email.match('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')) {
            return Message.createMessageError(MessageEnum.ERR_INV_FORMAT + label, '');
        }
        return true;
    },

    phoneNumberWhitAreaCode: (value, label) => {
        if (value != null && value !== '' && value !== undefined) {
            if (!value.match('^[0-9]{2,3}(?:[0-9]){1}[0-9]{8}$')) {
                return Message.createMessageError(MessageEnum.ERR_INV + label, '');
            }
            return true;
        }
        return true;
    },

    areaCode: (value, label) => {
        if (value !== null && value !== '' && value !== undefined) {
            if (!value.match('^[1-9]{2}')) {
                return Message.createMessageError(MessageEnum.ERR_INV + label, '');
            }
            return true;
        }
        return true;
    },

    decimalNumber: (value, label) => {
        if (value !== null && value !== '' && value !== undefined) {
            const regex = /^(\d*\.)?\d+$/;
            if (!regex.test(value)) {
                return Message.createMessageError(MessageEnum.ERR_INV + label, '');
            }
            return true;
        }
        return true;
    },

    hasValidCharacters: (value, label) => {
        if (value !== null && value !== '' && value !== undefined) {
            if (value.match('[!#$%&()*+:;?@[\\\]_`{|}~]')) { // accepts the following characters => , . - '
                return Message.createMessageError(MessageEnum.ERR_INVCHR + label, value);
            }
            return true;
        }
        return true;
    },

    hasValidCharactersNoNumbers: (value, label) => {
        if (value !== null && value !== '' && value !== undefined) {
            const regex = /^[a-záàâãéèêíïóôõöúçñ ]+$/img;
            if (!regex.test(value)) {
                return Message.createMessageError(MessageEnum.ERR_INVCHR + label, value);
            }
            return true;
        }
        return true;
    },

    phoneNumber: (value, label) => {
        if (value !== null && value !== '' && value !== undefined) {
            if (!value.match('^\(?:[2-8]|9[1-9])[0-9]{3}\[0-9]{4}$')) {
                return Message.createMessageError(MessageEnum.ERR_INV + label, '');
            }
            return true;
        }
        return true;
    },

    required: (field, label) => {
        if (field === null || field === '' || field === undefined || field.length === 0) {
            return Message.createMessageError(MessageEnum.ERR_REQUIRED + label, '');
        } else {
            return true;
        }
    },

    validDate: (date, label) => {
        if (date !== null) {
            const validDate = moment(date, 'YYYY-MM-DD', true).isValid();
            if (validDate) {
                return true;
            } else {
                return Message.createMessageError(MessageEnum.ERR_INV_FORMAT + label, '');
            }
        }
        return true;
    }

}
