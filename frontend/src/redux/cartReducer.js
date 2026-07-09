const initialState = {
  items: [],
  total: 0,
  loading: false,
};

const CART_ACTIONS = {
  SET_CART: 'SET_CART',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_CART:
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        loading: false,
      };
    case CART_ACTIONS.ADD_ITEM:
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      };
    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      };
    case CART_ACTIONS.UPDATE_ITEM:
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
      };
    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
      };
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const setCart = (items, total) => ({
  type: CART_ACTIONS.SET_CART,
  payload: { items, total },
});

export const addItemToCart = (items, total) => ({
  type: CART_ACTIONS.ADD_ITEM,
  payload: { items, total },
});

export const removeItemFromCart = (items, total) => ({
  type: CART_ACTIONS.REMOVE_ITEM,
  payload: { items, total },
});

export const updateItemInCart = (items, total) => ({
  type: CART_ACTIONS.UPDATE_ITEM,
  payload: { items, total },
});

export const clearCartAction = () => ({
  type: CART_ACTIONS.CLEAR_CART,
});

export const setCartLoading = (loading) => ({
  type: CART_ACTIONS.SET_LOADING,
  payload: loading,
});
