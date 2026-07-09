const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const AUTH_ACTIONS = {
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  LOGOUT: 'LOGOUT',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case AUTH_ACTIONS.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: AUTH_ACTIONS.SET_USER,
  payload: user,
});

export const setToken = (token) => ({
  type: AUTH_ACTIONS.SET_TOKEN,
  payload: token,
});

export const setAuthLoading = (loading) => ({
  type: AUTH_ACTIONS.SET_LOADING,
  payload: loading,
});

export const setAuthError = (error) => ({
  type: AUTH_ACTIONS.SET_ERROR,
  payload: error,
});

export const logout = () => ({
  type: AUTH_ACTIONS.LOGOUT,
});
