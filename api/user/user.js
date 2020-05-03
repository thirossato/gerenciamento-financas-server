'use strict';
const service = require('./user-service')
const io = require('../io/index')

module.exports.retrieve = async (event, context) => {
    try {
        const email_id = event.pathParameters.email_id
        let result
        result = await service.getUser(email_id);
        return io.handler.returnHttpResponse(result);
    } catch (error) {
        return io.handler.returnHttpResponse(error);
    }
}
module.exports.retrieveExpensesOnDate = async (event) => {
    try {
        const email_id = event.pathParameters.email_id
        const date = event.pathParameters.date
        let result
        result = await service.getUserExpenses(email_id, date)
        return  io.handler.returnHttpResponse(result);

    }catch (error) {
        return io.handler.returnHttpResponse(error);
    }
}
