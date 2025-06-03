export const initialState = {
  theme: "dark",
}

// action type
export const SET_LIGHT = "setLight"
export const SET_DARK = "setDark"

// action 
export const setLight = {
  type: SET_LIGHT,
  data: {
    theme: "light",
  },
}

export const setDark = {
  type: SET_DARK,
  data: {
    theme: "dark",
  },
}

// reducer 정의
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LIGHT: {
      return {
        ...state,
        theme: "light",
      }
    }
    case SET_DARK: {
      return {
        ...state,
        theme: "dark",
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default reducer
