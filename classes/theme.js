class Theme {

    _styles

    constructor() {
        this._styles = {}
    }

    //sets style as HEX color
    setStyle(name, color) {
        if (name == 'font') return 0
        if (this._styles[name] == undefined) this._styles[name] = new Colour(color)
        else this._styles[name].setConverted(Colour.modes.HEX, color)
        return true
    }

    setStyleRGB(name, color) {
        return this.setStyle(name, Colour.convertRGBintoHEX(color))
    }

    setStyleRaw(name, style) {
        this._styles[name] = '!' + style
    }

    //imports styles as object of HEX colors. useful for loading saved
    importStyles(hexObject) {
        for (const i in hexObject) {
            if (hexObject[i][0] != '!') this.setStyle(i, hexObject[i])
            else this.setStyleRaw(i, hexObject[i].slice(1))
        }
    }

    //returns only specified style as rgb-format
    getStyle(name) {
        if (!this._styles[name]) return undefined
        if (this._styles[name][0] != '!') return this._styles[name].getConverted(Colour.modes.RGB)
        else return this._styles[name].slice(1)
    }

    //returns all saved styles as HEX-format (useful for saving)
    getAllStyles() {
        let result = {}
        for (let i in this._styles) {
            if (this._styles[i][0] != '!') result[i] = this._styles[i].getConverted(Colour.modes.HEX)
            else result[i] = this._styles[i]
        }
        return result
    }

    getKeys() {
        return Object.keys(this._styles)
    }

    getLength() {
        return Object.keys(this._styles).length
    }
}