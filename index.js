const { model } = require("mongoose");







const objectify = exports.objectify = (arr, key = '_id') => arr.reduce((acc, item) => (acc[item[key]] = item, acc), {})
exports.compare =function compare (oldObj, newObj) {
    oldObj = oldObj instanceof Array ? objectify(oldObj) : oldObj
    newObj = newObj instanceof Array ? objectify(newObj) : newObj
    const newTemp = {}
    for (const key in { ...newObj, ...oldObj }) {
        if (oldObj[key] instanceof Object) {
            const recusived = compare(oldObj[key], newObj[key])
            if (Object.keys(recusived)[0]) newTemp[key] = recusived
        }
        else if (oldObj[key] && newObj[key] && oldObj[key] != newObj[key]) {
            newTemp[key] = { old: oldObj[key], new: newObj[key], status: 'updated' }
        }
        else if (!newObj[key] && oldObj[key]) {

            newTemp[key] = { old: oldObj[key], status: 'deleted' }
        }
        else if (!oldObj[key] && newObj[key]) {
            newTemp[key] = { new: newObj[key], status: 'added' }
        }
    }
    return newTemp

}

