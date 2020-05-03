const AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

module.exports.dynamo = {
    put: async (data, callback) => {
        const params = {
            TableName: 'users',
            Item: data
        }
        await docClient.put(params, function (err, data) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
}

module.exports.handler = {
    returnHttpResponse: err => {
        return {
            statusCode: err.code ? err.code : 500,
            body: JSON.stringify(
                {
                    message: err.message ? err.message : 'Erro desconhecido',
                },
                null,
                2
            )
        }
    }
}
