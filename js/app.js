// Menu Hide ANd SHow Js Code
let menu_btn=document.querySelector(".menu-btn");
menu_btn.addEventListener("click",function()
{
    let nav=document.querySelector("nav");
    let icon=document.querySelector(".menu-btn i");
    
    if(icon.classList.contains("fa-bars"))
        {
            icon.classList.replace("fa-bars","fa-xmark");
            nav.style.opacity="1";
            nav.style.visibility="visible";
            nav.style.top="100px";
        }
        else
        {
            icon.classList.replace("fa-xmark","fa-bars");
            nav.style.opacity="0";
            nav.style.visibility="hidden";
            nav.style.top="0px";
        }
})

// Start Cart Js Code

let cartBtn = document.getElementById("show-cart");
let cartItems = document.querySelector(".cart-items");
let cartCount = document.querySelector(".cart-text");
let cartTotal = document.createElement('div');
cartTotal.classList.add('cart-total');
cartTotal.innerHTML = `<strong>Total: $0</strong>`;
cartItems.querySelector('.cart-footer').appendChild(cartTotal);

// Function to toggle the cart visibility
function toggleCart() {
    if (cartItems.style.opacity === "1") {
        cartItems.style.opacity = "0";
        cartItems.style.visibility = "hidden";
        cartItems.style.marginTop = "0px";
    } else {
        cartItems.style.opacity = "1";
        cartItems.style.visibility = "visible";
        cartItems.style.marginTop = "20px";
    }
}

// Event listener for the cart button
cartBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    toggleCart();
});

// Event listener for clicks outside the cart
document.addEventListener("click", function(event) {
    if (!cartItems.contains(event.target) && !cartBtn.contains(event.target)) {
        cartItems.style.opacity = "0";
        cartItems.style.visibility = "hidden";
        cartItems.style.marginTop = "0px";
    }
});

// Add to Cart functionality
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        let product = this.closest('.product');
        let productName = product.querySelector('h3').textContent;
        let productPrice = parseFloat(product.querySelector('strong').textContent.replace('$', ''));
        let productImage = product.querySelector('img').src;
        addItemToCart(productName, productPrice, productImage);
        saveCartToLocalStorage(); // Save cart to local storage after adding an item
    });
});

function addItemToCart(name, price, image) {
    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <div class="left">
            <div class="image">
                <img src="${image}" alt="Product image">
            </div>
        </div>
        <div class="right">
            <h3>${name}</h3>
            <div class="p-footer">
                <strong>$${price.toFixed(2)}</strong>
                <button class="cart-remove-btn"><i class="fas fa-times"></i></button>
            </div>
        </div>
    `;
    cartItems.insertBefore(cartItem, cartItems.querySelector('.cart-footer'));
    updateCartCount(1);
    updateCartTotal(price);

    cartItem.querySelector('.cart-remove-btn').addEventListener('click', function() {
        removeItemFromCart(cartItem, price);
        saveCartToLocalStorage(); // Save cart to local storage after removing an item
    });

    checkCartEmpty();
}

function removeItemFromCart(cartItem, price) {
    cartItem.remove();
    updateCartCount(-1);
    updateCartTotal(-price);
    checkCartEmpty();
}

function updateCartCount(amount) {
    let currentCount = parseInt(cartCount.textContent.match(/\d+/)[0]);
    cartCount.textContent = `(${currentCount + amount})`;
}

function updateCartTotal(amount) {
    let currentTotal = parseFloat(cartTotal.querySelector('strong').textContent.replace('Total: $', ''));
    let newTotal = currentTotal + amount;
    cartTotal.querySelector('strong').textContent = `Total: $${newTotal.toFixed(2)}`;
}

function checkCartEmpty() {
    let cartItemElements = cartItems.querySelectorAll('.cart-item');
    let cartEmptyMessage = cartItems.querySelector('.cart-empty-message');

    if (cartItemElements.length === 0) {
        if (!cartEmptyMessage) {
            cartEmptyMessage = document.createElement('div');
            cartEmptyMessage.classList.add('cart-empty-message');
            cartEmptyMessage.textContent = 'Your cart is empty.';
            cartItems.insertBefore(cartEmptyMessage, cartItems.querySelector('.cart-footer'));
        }
    } else {
        if (cartEmptyMessage) {
            cartEmptyMessage.remove();
        }
    }
}

// Initial check if the cart is empty
checkCartEmpty();

// Function to save cart items to local storage
function saveCartToLocalStorage() {
    let cartItemsArray = [];

    // Iterate through each cart item and store relevant data
    cartItems.querySelectorAll('.cart-item').forEach(item => {
        let itemName = item.querySelector('h3').textContent;
        let itemPrice = parseFloat(item.querySelector('strong').textContent.replace('$', ''));
        let itemImage = item.querySelector('img').src;

        cartItemsArray.push({ name: itemName, price: itemPrice, image: itemImage });
    });

    // Save cart data to local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItemsArray));
}

// Function to load cart items from local storage on page load
function loadCartFromLocalStorage() {
    let cartItemsArray = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItemsArray) {
        cartItemsArray.forEach(item => {
            addItemToCart(item.name, item.price, item.image);
        });
    }
}

// Load cart items from local storage on page load
loadCartFromLocalStorage();

//  End Cart Js Code


// Start loging and registration
// Get the modals
let loginModal = document.getElementById("loginModal");
let registerModal = document.getElementById("registerModal");

// Get the buttons that open the modals
let loginBtn = document.querySelector(".login-btn"); // Modify this selector based on your actual button
let registerBtn = document.getElementById("showRegister");
let backToLoginBtn = document.getElementById("showLogin");

// Get the <span> elements that close the modals
let closeLogin = document.getElementById("closeLogin");
let closeRegister = document.getElementById("closeRegister");

// When the user clicks on the button, open the login modal
loginBtn.addEventListener("click", function() {
    loginModal.style.display = "block";
});

// When the user clicks on <span> (x), close the login modal
closeLogin.addEventListener("click", function() {
    loginModal.style.display = "none";
});

// When the user clicks on the button, open the registration modal
registerBtn.addEventListener("click", function() {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
});

// When the user clicks on <span> (x), close the registration modal
closeRegister.addEventListener("click", function() {
    registerModal.style.display = "none";
});

// When the user clicks on the button, go back to login modal
backToLoginBtn.addEventListener("click", function() {
    registerModal.style.display = "none";
    loginModal.style.display = "block";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target === registerModal) {
        registerModal.style.display = "none";
    }
});

// End loging and registration



// shop searching and filter js
document.addEventListener('DOMContentLoaded', function () {
    const productFilter = document.getElementById('productFilter');
    const searchInput = document.getElementById('searchInput');
    const productsContainer = document.querySelector('.products');
    const notFoundMessage = document.getElementById('notFoundMessage');

    // Original products array for reference
    const originalProducts = [...productsContainer.querySelectorAll('.product')];

    // Event listeners for filter and search
    productFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);

    // Function to filter products based on selected type and search input
    function filterProducts() {
        const selectedType = productFilter.value.toLowerCase();
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Filter products based on selected type and search term
        const filteredProducts = originalProducts.filter(product => {
            const productType = product.querySelector('.p-footer > p').textContent.toLowerCase();
            const productName = product.querySelector('h3').textContent.toLowerCase();

            const matchesType = selectedType === 'all' || productType.includes(selectedType);
            const matchesSearch = productName.includes(searchTerm);

            return matchesType && matchesSearch;
        });

        // Show/hide products and not found message
        if (filteredProducts.length > 0) {
            notFoundMessage.style.display = 'none';
            productsContainer.innerHTML = ''; // Clear existing products
            filteredProducts.forEach(product => {
                productsContainer.appendChild(product);
            });
        } else {
            productsContainer.innerHTML = ''; // Clear existing products
            notFoundMessage.style.display = 'block';
        }
    }

    // Initialize filter on page load
    filterProducts();
});




