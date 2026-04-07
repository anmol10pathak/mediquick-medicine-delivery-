let currentUser = localStorage.getItem("loggedInUser");

function showShop() {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("shopSection").style.display = "block";
    document.getElementById("userName").innerText = currentUser;
    loadCart();
}

function showAuth() {
    document.getElementById("authSection").style.display = "block";
    document.getElementById("shopSection").style.display = "none";
}

// REGISTER
function register() {
    let user = document.getElementById("regUser").value;
    let pass = document.getElementById("regPass").value;

    if (!user || !pass) return alert("Fill all fields");

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[user]) {
        alert("User already exists");
        return;
    }

    users[user] = pass;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
}

// LOGIN
function login() {
    let user = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[user] === pass) {
        localStorage.setItem("loggedInUser", user);
        currentUser = user;
        showShop();
    } else {
        alert("Invalid credentials");
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedInUser");
    currentUser = null;
    showAuth();
}

// CART
function addToCart(product) {
    if (!currentUser) {
        alert("Please login first!");
        return;
    }

    let cart = JSON.parse(localStorage.getItem(currentUser + "_cart")) || [];
    cart.push(product);
    localStorage.setItem(currentUser + "_cart", JSON.stringify(cart));

    loadCart();
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem(currentUser + "_cart")) || [];
    let list = document.getElementById("cartList");

    list.innerHTML = "";
    cart.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
}

// AUTO LOGIN CHECK
if (currentUser) {
    showShop();
} else {
    showAuth();
}