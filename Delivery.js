export default class Delivery {

    constructor(name, address, distance) {
        this._name = name
        this._address = address
        this._distance = distance
    }

    getDeliveryCard() {
        const cardEl = document.createElement('div');
        cardEl.classList.add('deliveryCard')

        const nameBlock = this.getcardBlock('Имя', this._name)
        nameBlock.classList.add('nameBlock')
        const addressBlock = this.getcardBlock('Адрес', this._address)
        addressBlock.classList.add('addressBlock')
        const distanceBlock = this.getcardBlock('Расстояние', `${this._distance} км`)
        distanceBlock.classList.add('distanceBlock')

        this._cardEl = cardEl
        cardEl.append(nameBlock, addressBlock, distanceBlock)  
        return cardEl  
    }

    getcardBlock(label, text) {
        const block = document.createElement('div');

        const labelEl = document.createElement('p');
        labelEl.textContent = label
        const mainTextEl = document.createElement('h2');
        mainTextEl.textContent = text
        block.append(labelEl, mainTextEl)

        return block
    }

    set name(value) {
        if (this._cardEl && value != '') {
            this._name = value
            this._cardEl.querySelector('.nameBlock').querySelector('h2').textContent = this._name
        }
        
    }

    get name() {
        return this._name
    }

    set adress(value) {
        if (this._cardEl && value != '') {
            this._adress = value
            this._cardEl.querySelector('.addressBlock').querySelector('h2').textContent = this._address
        }
    }

    get adress() {
        return this._address
    }

    set distance(value) {
        if (this._cardEl && value > 0) {
            this._distance = value
            this._cardEl.querySelector('.distanceBlock').querySelector('h2').textContent = `${this._distance} км`
        }
    }

    get distance() {
        return this._distance
    } 
}