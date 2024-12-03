const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const body = document.querySelector('body');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const quantity = document.querySelector('.quantidade');
const total = document.querySelector('.total');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    { id: 1, name: 'Camisa Santos Autografada Neymar 11/12', image: 'camisa_santos.webp', price: 599.99 },
    { id: 2, name: 'Camisa Brasil Autografada Pelé 69/70', image: 'camisa_pele.webp', price: 599.99 }, 
    { id: 3, name: 'Camisa Botafogo 23/24', image: 'camisa_botafogo.png', price: 149.99 },
    { id: 4, name: 'Camisa Cruzeiro 23/24', image: 'camisa_cruzeiro.webp', price: 149.99 },
    { id: 5, name: 'Camisa Flamengo 23/24', image: 'camisa_flamengo.webp', price: 149.99 },
    { id: 6, name: 'Camisa Fluminense 23/24', image: 'camisa_fluminense.webp', price: 149.99 },
    { id: 7, name: 'Camisa Internacional 23/24', image: 'camisa_internacional.jpeg', price: 149.99 },
    { id: 8, name: 'Camisa Palmeiras 23/24', image: 'camisa_palmeiras2.webp', price: 149.99 },
    { id: 9, name: 'Camisa São Paulo 23/24', image: 'camisa_saopaulo.webp', price: 149.99 },
    { id: 10, name: 'Camisa Vasco da Gama 23/24', image: 'camisa_vasco.jpeg', price: 149.99 },
    { id: 11, name: 'Camisa Atlético Mineiro 23/24', image: 'camisa_atleticomg.avif', price: 149.99 },
    { id: 12, name: '2º Camisa Palmeiras 23/24 ', image: 'camisa_palmeiras2.avif', price: 149.99 }
];

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        if (value.name.includes('Santos Autografada')) {
            newDiv.classList.add('santosAA'); // destaca a camisa santos autografada
        } else if (value.name.includes('Brasil')) {
            newDiv.classList.add('brasilAA'); // destaca a camisa brasil
        }
        newDiv.innerHTML = `
            <img src="img/${value.image}" alt="${value.name}">
            <div class="title">${value.name}</div>
            <div class="price">R$ ${value.price.toFixed(2)}</div>
            <button onClick="addToCard(${key})">Adicionar ao Carrinho</button>
        `;
        list.appendChild(newDiv);
    });
};

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity += 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;
            let newLi = document.createElement('li');
            newLi.innerHTML = `
                <div><img src="img/${value.image}" alt="${value.name}"></div>
                <div>${value.name}</div>
                <div class="count">
                    <button class="cardButton" onClick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div>${value.quantity}</div>
                    <button class="cardButton" onClick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
                <div>R$ ${(value.price * value.quantity).toFixed(2)}</div>
            `;
            listCard.appendChild(newLi);
        }
    });

    total.innerText = `R$ ${totalPrice.toFixed(2)}`;
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity === 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}