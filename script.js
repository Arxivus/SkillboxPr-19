import Delivery from './Delivery.js'
import EditDelivery from './EditDelivery.js'

const deliveryArr = [
    new Delivery("Ольга", "ул. Вымыслов, д. 12", 8),
    new EditDelivery("Олег", "ул. Задачная, д. 7", 11, "delivery"),
    new EditDelivery("Дмитрий", "ул. Задачная, д. 7", 5, "delivered"),
    new EditDelivery("Мария", "ул. Ленина, д. 7", 3, "canceled")
];

deliveryArr.forEach(item => {
    const card = item.getDeliveryCard()
    const app = document.querySelector('.app');
    app.append(card)
});

const calcButton = document.querySelector('.calc-button');
const dictanceMessage = document.querySelector('.calculated-distance');


calcButton.onclick = () => {
    const distanceCount = EditDelivery.getTotalDistance(deliveryArr)
    dictanceMessage.textContent = `Общее расстояние: ${distanceCount} км`
}



