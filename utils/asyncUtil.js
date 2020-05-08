const random = require('./random')

function chunking (array, chunkSize = 50) {
    return array.reduce((acc, _, index) => (index % chunkSize) ? acc : [...acc, array.slice(index, index + chunkSize)], [])
}

function delay (ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function callFunctionSequentially (asyncFunctionList, chunkSize = 50, ms = null, interimFunction = null) {
    const functionChunks = chunking(asyncFunctionList, chunkSize)

    let index = 0

    const length = functionChunks.length
    const result = []
    const failed = []

    for await (const chunk of functionChunks) {
        if (ms !== null) {
            const randomMs = random.getExponentiallyUniform(ms, ms + 300)
            await delay(randomMs)
        }

        // eslint-disable-next-line no-useless-catch
        try {
            const settleList = await Promise.settle(chunk.map(asyncFunction => asyncFunction()))

            const failList = settleList.filter(item => item.isRejected()).map(item => item.reason())
            const resList = settleList.filter(item => item.isFulfilled()).map(item => item.value())

            result.push(...resList)
            failed.push(...failList)

            index += 1

            if (interimFunction !== null && interimFunction instanceof Function) {
                const successCount = result.length
                const failedCount = failed.length
                interimFunction({ resList, index, length, successCount, failedCount })
            }
        } catch (e) {
            throw e
        }
    }

    return [result, failed]
}

module.exports = {
    callFunctionSequentially,
    delay,
    chunking
}
