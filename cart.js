// GET CART
export const getCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
};

// ADD TO CART (with quantity)
export const addToCart = (item) => {
  const cart = getCart();

  const existing = cart.find((i) => i.id === item.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// INCREASE QTY
export const increaseQty = (id) => {
  const cart = getCart();
  cart.forEach((item) => {
    if (item.id === id) item.qty += 1;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
};

// DECREASE QTY
export const decreaseQty = (id) => {
  let cart = getCart();

  cart = cart
    .map((item) =>
      item.id === id ? { ...item, qty: item.qty - 1 } : item
    )
    .filter((item) => item.qty > 0); // remove if qty 0

  localStorage.setItem("cart", JSON.stringify(cart));
};

// REMOVE ITEM
export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// CLEAR CART
export const clearCart = () => {
  localStorage.removeItem("cart");
};