

// Cart
let cartIcon = document.querySelector('#important');
let cart = document.querySelector('.fsCart');
let closeCart = document.querySelector('#close-cart');

// Open Cart
cartIcon.addEventListener("click", function() {
    cart.classList.add('active');
});

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart working JS
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready() {
    // Remove Items from Cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', retractCartButtons);
    }

    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add to cart
    var addCartButtons = document.getElementsByClassName("ps4White");
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener("click", addCartClicked);
    }

    // Buy Button Work
    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked);
}

// Buy BUTTON 
function buyButtonClicked() {
    alert('Your Order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function retractCartButtons(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity Changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Add to cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('ps4White')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            alert("You have already added this item to the cart");
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', retractCartButtons);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}

// Update Total
function updateTotal() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        
        var priceText = priceElement.innerText.replace("₦", "").replace(/,/g, "").trim();
        var price = parseFloat(priceText);

        if (isNaN(price)) {
            console.error("Price is not a valid number:", priceText);
            continue; // Skip this item if price is not a valid number
        }

        var quantity = parseFloat(quantityElement.value);
        if (isNaN(quantity)) {
            console.error("Quantity is not a valid number:", quantityElement.value);
            continue; // Skip this item if quantity is not a valid number
        }

        console.log(`Item ${i+1}: Price = ${price}, Quantity = ${quantity}, Subtotal = ${price * quantity}`);
        total += price * quantity;
    }

    // If price contains some kobo value
    total = Math.round(total * 100) / 100;
    console.log(`Total Price: ₦${total}`);
    document.getElementsByClassName('total-price')[0].innerText = "₦" + total;
}





