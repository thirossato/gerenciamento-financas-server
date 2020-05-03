const io = require('../io/index');
const ValidateUser = require('./user-validator');

module.exports = {
    submitUser: async (data) => {
        const serviceReturn = {
            code: 200,
            message: 'Dados cadastrados com sucesso'
        }

        const validations = ValidateUser.validate(data);
        if (validations === true) {
            await io.dynamo.put(data, function (err, data) {
                if (err) {
                    serviceReturn.code = err.code;
                    serviceReturn.message = err.message;
                }
            })
        } else {
            serviceReturn.code = 400;
            serviceReturn.message = validations.fields
        }
        console.log({serviceReturn})
        return serviceReturn;
    },
}
