const nullCheck = (object) => Object.keys(object).every(key => object[key] !== null && object[key] !== undefined)

function refine (object) {
    return Object.keys(object).reduce((prev, key) => {
        let converted
        try {
            converted = JSON.parse(object[key])
        } catch (e) {
            converted = object[key]
        }
        prev[key] = converted
        return prev
    }, { })
}

export default {
    nullCheck,
    refine
}

export {
    nullCheck,
    refine
}
