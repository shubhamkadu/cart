const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartitem) => cartitem.id !== action.payload),
    };
  }

  if (action.type === "INCREASE") {
    const tempcart = state.cart.map((cartitem) => {
      if (cartitem.id === action.payload) {
        return { ...cartitem, amount: cartitem.amount + 1 };
      }

      return cartitem;
    });

    return { ...state, cart: tempcart };
  }

  if (action.type === "DECREASE") {
    let tempcart = state.cart
      .map((cartitem) => {
        if (cartitem.id === action.payload) {
          return { ...cartitem, amount: cartitem.amount - 1 };
        }
        return cartitem;
      })
      .filter((cartitem) => cartitem.amount !== 0);

    return { ...state, cart: tempcart };
  }

  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  return state;
};

export default reducer;
