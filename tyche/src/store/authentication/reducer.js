const initialstate = {
  ethereum_address: null,
}

export const authReducer = (currentState = initialstate, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...currentState,
        ethereum_address: action.payload.ethereum_address,
      }
    default: return currentState;
  }
}