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
        let expenses = new Array();
        if (data.gasto && data.gasto.parcelas && data.gasto.parcelas > 0) {
            const originalExpenseDate = new Date(parseInt(data.gasto.dataDespesa, 10));
            for (var i = 0; i < data.gasto.parcelas; i++) {
                let dataParcela = originalExpenseDate.setMonth(originalExpenseDate.getMonth() + i);
                dataParcela = new Date(
                    originalExpenseDate.getFullYear(),
                    originalExpenseDate.getMonth(),
                    originalExpenseDate.getDay(),
                    0,
                    0,
                    0
                );
                const expense = {
                    dataDespesa: dataParcela * 1,
                    descricaoGasto: data.gasto.descricaoGasto,
                    parcelas: data.gasto.parcelas,
                    valorGasto: data.gasto.valorGasto / data.gasto.parcelas
                }
                expenses.push(expense)
            }
            const saveObject = {
                email_id: data.email_id,
                gastos: expenses
            }
            await io.dynamo.updateExpensesArray(saveObject).then(response => {
                ret = returnData(response)
            }).catch(err => {
                ret = returnError(err)
            })
        } else {
            await io.dynamo.updateExpenses(data).then(response => {
                ret = returnData(response)
            }).catch(err => {
                ret = returnError(err)
            })
        }
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
    },

    getUserExpenses: async (email_id, date) => {
        const dataDespesaInicial = new Date(
            new Date(
                new Date(
                    new Date(+date).setHours(0)
                ).setMinutes(0)
            ).setSeconds(0)
        ).setMilliseconds(0)

        const dataDespesaFinal = new Date(
            new Date(
                new Date(
                    new Date(+date).setHours(23)
                ).setMinutes(59)
            ).setSeconds(59)
        ).setMilliseconds(59)
        let ret;
        await io.dynamo.queryExpensesByDate(email_id, date).then(data => {
            if (data && data.Item.gastos) {
                let gastos = data.Item.gastos.filter(f => f.dataDespesa > dataDespesaInicial).filter(f => f.dataDespesa < dataDespesaFinal);
                ret = returnData(gastos);
            }
        }).catch(err => {
            ret = returnError(err);
        })
        return ret;
    }
}
