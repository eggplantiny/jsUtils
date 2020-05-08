
if (!Array.flat) {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Array.prototype, 'flat', {
        value (depth = 1) {
            return this.reduce(function (flat, toFlatten) {
                return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten)
            }, [])
        }
    })
} else {
    let errorMessage = 'DANGER ALERT! Array.flat has already been defined on node. '
    errorMessage += 'This may lead to unwanted results when Array.flat() is executed.'
    console.log(errorMessage)
}

if (!Array.range) {
    Object.defineProperty(Array, 'range', {
        value (from, to, step) {
            if (typeof from !== 'number' && typeof from !== 'string') {
                throw new TypeError('The first parameter should be a number or a character')
            }

            if (typeof to !== 'number' && typeof to !== 'string') {
                throw new TypeError('The second parameter should be a number or a character')
            }

            let A = []
            if (typeof from === 'number') {
                A[0] = from
                step = step || 1
                while (from + step < to) {
                    A[A.length] = from += step
                }
            } else {
                let s = 'abcdefghijklmnopqrstuvwxyz'
                if (from === from.toUpperCase()) {
                    to = to.toUpperCase()
                    s = s.toUpperCase()
                }
                s = s.substring(s.indexOf(from), s.indexOf(to) + 1)
                A = s.split('')
            }
            return A
        }
    })
} else {
    let errorMessage = 'DANGER ALERT! Array.range has already been defined on node. '
    errorMessage += 'This may lead to unwanted results when Array.range() is executed.'
    console.log(errorMessage)
}

if (!Promise.settle) {
    Promise.settle = function (promises) {
        function PromiseInspection (fulfilled, val) {
            return {
                isFulfilled () {
                    return fulfilled
                },
                isRejected () {
                    return !fulfilled
                },
                isPending () {
                    // PromiseInspection objects created here are never pending
                    return false
                },
                value () {
                    if (!fulfilled) {
                        throw new Error("Can't call .value() on a promise that is not fulfilled")
                    }
                    return val
                },
                reason () {
                    if (fulfilled) {
                        throw new Error("Can't call .reason() on a promise that is fulfilled")
                    }
                    return val
                }
            }
        }

        return Promise.all(promises.map(function (p) {
            // make sure any values are wrapped in a promise
            return Promise.resolve(p).then(function (val) {
                return new PromiseInspection(true, val)
            }, function (err) {
                return new PromiseInspection(false, err)
            })
        }))
    }
} else {
    let errorMessage = 'DANGER ALERT! Promise.settle has already been defined on node. '
    errorMessage += 'This may lead to unwanted results when Promise.settle() is executed.'
    console.log(errorMessage)
}


//  https://okky.kr/article/256810
String.format = (str, ...args) => args.reduce((prev, t, c) => prev.replace(new RegExp(`\\{${c}\\}`, 'gm'), t), str)
