'use strict';
const service = require('./user-service')
const io = require('../io/index')

module.exports.primaryInfoSubmit = async (data, context) => {
    try {
        let result
        result = await service.submitUser(JSON.parse(data.body));
        return io.handler.returnHttpResponse(result);
    } catch (error) {
        return io.handler.returnHttpResponse(error);
    }
}
