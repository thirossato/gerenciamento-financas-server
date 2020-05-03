const Validator = require('../io/validator')
const Message = require('../io/message')
const FieldsEnum = require('../io/fields-enum')

module.exports = {
    validate: (data) => {
        console.log({data});
        const response = new Array();
        response.push(Validator.required(data.nomeUsuario, FieldsEnum.NAME));
        response.push(Validator.fullName(data.nomeUsuario, FieldsEnum.NAME));
        response.push(Validator.nameHasValidCharacters(data.nomeUsuario, FieldsEnum.NAME));

        response.push(Validator.required(data.email_id, FieldsEnum.EMAIL));
        response.push(Validator.email(data.email_id, FieldsEnum.EMAIL));

        response.push(Validator.decimalNumber(data.gastoMes, FieldsEnum.GASTOS_MES));
        response.push(Validator.decimalNumber(data.rendaMes, FieldsEnum.RENDA_MES));
        return Message.createResponseMessage(response);
    }
}
