export const ACTION_OPEN = 'open'
export const ACTION_CLOSE = 'close'

export function modalReducer (state, action) {
  switch (action.type) {
    case ACTION_OPEN: {
      const { payload } = action
      return {
        ...state,
        ...payload,
        isOpen: true
      }
    }
    case ACTION_CLOSE: {
      return {
        ...state,
        isOpen: false
      }
    }
    default: return state
  }
}
