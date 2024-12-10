import Delivery from './Delivery.js'

export default class EditDelivery extends Delivery {

    constructor(name, address, distance, status) {
        super(name, address, distance)
        this._status = status
        this._statuses = {
            'Доставляется': 'delivery',
            'Доставлен': 'delivered',
            'Отменён': 'canceled' 
        }
    }

    static getTotalDistance(deliveries) {
        let distanceCount = 0
        deliveries.forEach(deliveryInfo => {
            if (deliveryInfo._distance && deliveryInfo._status != 'canceled')
                distanceCount += deliveryInfo._distance
        });
        return distanceCount
    }

    getDeliveryCard() {
        this._cardEl = super.getDeliveryCard()

        const editButton = document.createElement('button');
        editButton.classList.add('edit-btn')
        editButton.textContent = 'Изменить'
        editButton.onclick = () => this.showEditForm()

        this._cardEl.append(editButton)
        this._cardEl.classList.add(this._status)
        return this._cardEl
    }

    showEditForm() {
        const form = document.querySelector('form');
        form.innerHTML = ''

        const overlay = document.querySelector('.overlay');
        this.createForm(form, overlay)
        overlay.style.display = 'block'
        form.style.display = 'flex'

    }

    createForm(form, overlay) {

        const closeButton = document.createElement('button');
        closeButton.classList.add('close')
        closeButton.type = 'button'
        closeButton.onclick = () => {
            form.style.display = 'none'
            overlay.style.display = 'none'
        }

        const formTitle = document.createElement('h2');
        formTitle.textContent = 'Изменить'

        const nameInput = document.createElement('input');
        nameInput.placeholder = 'Имя'
        nameInput.type = 'text'
        nameInput.value = this._name

        const addressInput = document.createElement('input');
        addressInput.placeholder = 'Адрес'
        addressInput.type = 'text'
        addressInput.value = this._address

        const distanceInput = document.createElement('input');
        distanceInput.placeholder = 'Расстояние'
        distanceInput.type = 'number'
        distanceInput.min = 1
        distanceInput.value = this._distance

        const statusSelect = document.createElement('select');
        const option1 = document.createElement('option');
        option1.textContent = 'Доставляется'
        const option2 = document.createElement('option');
        option2.textContent = 'Доставлен'
        const option3 = document.createElement('option');
        option3.textContent = 'Отменён'
        statusSelect.append(option1, option2, option3)

        switch (this.status) {
            case 'delivery':
                option1.selected = true
                break
            case 'delivered': 
                option2.selected = true
                break
            case 'canceled':
                option3.selected = true
                break
        }

        const saveButton = document.createElement('button');
        saveButton.classList.add('form-submit')
        saveButton.type = 'button'
        saveButton.textContent = 'Сохранить'

        saveButton.onclick = () => {

            this._name = nameInput.value
            this._address = addressInput.value
            this._distance = Number(distanceInput.value)
            this._status = this._statuses[statusSelect.value]


            this._cardEl.querySelector('.nameBlock').querySelector('h2').textContent = this._name
            this._cardEl.querySelector('.addressBlock').querySelector('h2').textContent = this._address
            this._cardEl.querySelector('.distanceBlock').querySelector('h2').textContent = `${this._distance} км`
            this._cardEl.className = ''
            this._cardEl.classList.add('deliveryCard', this._status) 

            form.style.display = 'none'
            overlay.style.display = 'none'
        }

        form.append(closeButton, formTitle, nameInput, addressInput, distanceInput, statusSelect, saveButton)
    }

    set status(value) {
        if (Object.values(this._statuses).includes(value)) {
            this._status = value
            this._cardEl.className = ''
            this._cardEl.classList.add('deliveryCard', this._status)
        }
    }

    get status() {
        return this._status
    }
}