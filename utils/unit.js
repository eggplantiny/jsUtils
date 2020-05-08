
class length {
    constructor (value, unit) {
        this.set(value, unit)
    }
    set (value, unit) {
        if (unit === 'cm') {
            this.value = value
        } else if (unit === 'm') {
            this.value = value * 100
        } else if (unit === 'in' || unit === 'inch') {
            this.value = value * 2.56
        } else if (unit === 'feet') {
            this.value = value * 30.48
        } else {
            this.value = 0
        }
    }
    to (unit) {
        if (unit === 'cm') {
            return this.value.toFixed(2)
        } else if (unit === 'm') {
            return (this.value / 100).toFixed(2)
        } else if (unit === 'in' || unit === 'inch') {
            return (this.value / 2.56).toFixed(2)
        } else if (unit === 'feet') {
            return (this.value / 30.48).toFixed(2)
        }
    }
}

class mass {
    constructor (value, unit) {
        this.set(value, unit)
    }
    set (value, unit) {
        if (unit === 'g') {
            this.value = value
        } else if (unit === 'kg') {
            this.value = value * 1000
        } else if (unit === 'lb') {
            this.value = value * 453.592
        }
    }
    to (unit) {
        if (unit === 'g') {
            return (this.value).toFixed(2)
        } else if (unit === 'kg') {
            return (this.value / 1000).toFixed(2)
        } else if (unit === 'lb') {
            return (this.value / 453.592).toFixed(2)
        }
    }
}

class number {
    constructor (value, unit) {
        this.set(value, unit)
    }
    type (unit) {
        unit = unit ? `${unit}`.toLowerCase() : null
        if ([null, 'd', 'decimal', 'dec'].includes(unit)) {
            return 'd'
        } else if (['h', 'hex', 'hexadecimal'].includes(unit)) {
            return 'h'
        } else if (['b', 'binary', 'bin'].includes(unit)) {
            return 'b'
        }
    }
    set (value, unit) {
        // unit = 'a|b|c|d|e|f|x|A|B|C|D|E|F|X'.split('|').some(token => `${value}`.includes(token)) ? 'hex' : 'd'
        const type = this.type(unit)
        if (type === 'd') {
            this.value = parseInt(`${value}`)
        } else if (type === 'h') {
            this.value = parseInt(`0x${value}`, 16)
        } else if (type === 'b') {
            this.value = parseInt(`${value}`, 2)
        } else {
            this.value = parseInt(`${value}`, unit)
        }
        return this
    }
    get (unit) {
        const type = this.type(unit)
        if (type === 'd') {
            return Number(this.value)
        } else if (type === 'h') {
            return this.value.toString(16)
        } else if (type === 'b') {
            return this.value.toString(2)
        } else {
            return this.value.toString(unit)
        }
    }
}

export default {
    length,
    mass,
    number
}

export {
    length,
    mass,
    number
}
