const MessageFields = require('./message-fields')

module.exports = {

    createMessageSuccess: (messageCode, parameter, body = null) => {
        if (body) {
            return {success: true, code: messageCode, parameter: parameter, body: body};
        } else {
            return {success: true, code: messageCode, parameter: parameter};
        }
    },

    createMessageError: (fieldCode, fieldParameter, body = null) => {
        const messageFields = new MessageFields();
        messageFields.code = fieldCode;
        messageFields.parameter = fieldParameter;
        const fields = new Array();
        fields.push(messageFields);
        if (body) {
            return {
                success: false,
                fields: fields,
                body: body
            };
        } else {
            return {
                success: false,
                fields: fields,
            };
        }
        ;
    },

    createResponseMessage: (messages) => {
        const fields = new Array();
        let messageError = new Object();

        for (let i = 0; i < messages.length; i++) {
            if (messages[i].success === false) {
                fields.push(messages[i].fields[0]);
                messageError = {
                    success: false,
                    fields: fields
                };
            }
        }

        if (fields.length > 0) {
            return messageError;
        } else {
            return true;
        }
    }
}
