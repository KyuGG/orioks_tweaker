class Colour {

    _color = [0, 0, 0]

    static modes = {
        'RGB': 0,
        'RGBArray': 1,
        'HEX': 2
    }

    constructor(hex) {
        this.setConverted(Colour.modes.HEX, hex)
    }

    getConverted(mode) {
        switch (mode) {
            case 0: return 'rgb(' + this._color[0] + ', ' + this._color[1] + ', ' + this._color[2] + ')'
            case 1: return [this._color[0], this._color[1], this._color[2]]
            case 2:
                let result = '#'
                for (const color of this._color) {
                    let hex = color.toString(16)
                    if (hex.length < 2) hex = '0' + hex
                    result += hex
                }
                return result
        }
        throw new Error('unsuppmode')
    }

    setConverted(mode, color) {
        switch (mode) {
            case 0:
                color = color.replace('rgb(', '').replace(')', '').replaceAll(' ', '').split(',')
            case 1:
                for (let i = 0; i < 3; i++) this._color[i] = color[i]
                break
            case 2:
                color = color.replace('#', '')
                for (let i = 0; i < 3; i++) this._color[i] = parseInt(color.slice(i * 2, (i + 1) * 2), 16)
                break
            default: throw new Error('unsuppmode')
        }
        this.checkThreshold()
        return this.getConverted(mode)
    }

    checkThreshold() {
        for (const color of this._color) {
            if (color < 0) color = 0
            else if (color > 255) color = 255
        }
    }

    static convertHEXintoRGB(hex) {
        let result = 'rgb('
        hex = hex.replace('#', '')
        for (let i = 0; i < 3; i++) {
            result += parseInt(hex.slice(i * 2, (i + 1) * 2))
            if (i < 2) result += ', '
        }
        result += ')'
        return result
    }

    static convertRGBintoHEX(rgb) {
        const colors = rgb.replace('rgb(', '').replace(')', '').replaceAll(' ', '').split(',')
        let result = '#'
        for (let i = 0; i < 3; i++) {
            let hex = parseInt(colors[i]).toString(16)
            if (hex.length < 2) hex = '0' + hex
            result += hex
        }
        return result
    }
}