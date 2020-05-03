const io = require('../io/index');
const ValidateUser = require('./user-validator');


serviceReturn = {
    code: 200,
    message: ''
}

function returnData(data) {
    serviceReturn.message = data;
    return serviceReturn
}

function returnError(err) {
    serviceReturn.code = err.statusCode;
    serviceReturn.message = err.message;
    return serviceReturn
}

module.exports = {
    submitUser: async (data) => {
        let ret;
        const validations = ValidateUser.validatePrimaryInfo(data);
        if (validations === true) {
            await io.dynamo.put(data).then(response => {
                ret = returnData(response)
            }).catch(err => {
                ret = returnError(err)
            })
        } else {
            ret = returnError({
                statusCode: 400,
                message: validations.fields
            })
        }
        return ret;
    },
    submitExpenses: async (data) => {
        let ret;
        await io.dynamo.updateExpenses(data).then(response => {
            ret = returnData(response)
        }).catch(err => {
            ret = returnError(err)
        })
        return ret
    },
    getUser: async (email_id) => {
        let ret;
        await io.dynamo.getUser(email_id).then(data => {
            ret = returnData(data);
        }).catch(err => {
            ret = returnError(err);
        })
        return ret;
    }
}
