const AWS = require('aws-sdk');
AWS.config.update({region: 'sa-east-1'});
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


function removeEmptyStringElements(obj) {
    for (var prop in obj) {
        if (typeof obj[prop] === 'object') {// dive deeper in
            removeEmptyStringElements(obj[prop]);
        } else if (obj[prop] === '') {// delete elements that are empty strings
            delete obj[prop];
        }
    }
}

module.exports.dynamo = {
    put: async (data) => {
        removeEmptyStringElements(data);
        const params = {
            TableName: 'users',
            Item: data
        }
        return new Promise(function (resolve, reject) {
            docClient.put(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    },
    updateExpenses: async (data) => {
        let expense = data.gasto;
        if (!expense) {
            return;
        }
        removeEmptyStringElements(expense);
        const params = {
            TableName: 'users',
            Key: {email_id: data.email_id},
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set #gastos = list_append(if_not_exists(#gastos, :empty_list), :expense)',
            ExpressionAttributeNames: {
                '#gastos': 'gastos'
            },
            ExpressionAttributeValues: {
                ':expense': [expense],
                ':empty_list': []
            }
        }
        return new Promise(function (resolve, reject) {
            docClient.update(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    },
    getUser: async(email_id) => {
        const params = {
            TableName: 'users',
            Key: {email_id}
        }
        return new Promise(function (resolve,reject) {
            docClient.get(params, function (err,data) {
                if(err) {
                    reject(err);
                }else{
                    resolve(data);
                }
            })
        })
    }
}

module.exports.handler = {
    returnHttpResponse: data => {
        return {
            statusCode: data.code ? data.code : 500,
            body: JSON.stringify(
                {
                    message: data.message ? data.message : '',
                },
                null,
                2
            )
        }
    }
}
