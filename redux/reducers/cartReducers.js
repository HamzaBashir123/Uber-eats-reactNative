let defaultState = {
  selectedItems: {
    items: [],
    restaurentName: "",
  },
};
const cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      let newState = { ...state };
      console.log(newState);
      if (action.payload.checkboxValue) {
        console.log("Add to Cart");

        newState.selectedItems = {
          items: [...newState.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
        };
      } else {
        console.log("Remove from Cart");
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter((item) => {
              item.title !== action.payload.title;
            }),
          ],
          restaurantName: action.payload.restaurantName,
        };
      }
      console.log(newState, "👉");
      return newState;
    }
    default:
      return state;
  }
};
export default cartReducer;
