// reducers/bookingReducer.js
const initialState = {
    selectedRooms: [],
  };
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ROOM':
        const existingRoomIndex = state.selectedRooms.findIndex(room => room.id === action.payload.id);
        if (existingRoomIndex !== -1) {
          const updatedRooms = [...state.selectedRooms];
          updatedRooms[existingRoomIndex] = {
            ...updatedRooms[existingRoomIndex],
            price: action.payload.price,
            num: action.payload.num
          };
  
          return {
            ...state,
            selectedRooms: updatedRooms,
          };
        } else {
          return {
            ...state,
            selectedRooms: [
              ...state.selectedRooms,
              {
                id: action.payload.id,
                price: action.payload.price,
                num: action.payload.num
              }
            ],
          };
        }
      case 'REMOVE_ROOM':
        return {
          ...state,
          selectedRooms: state.selectedRooms.filter(room => room.id !== action.payload.id),
        };
      case 'CLEAR_ROOMS':
        return {
          ...state,
          selectedRooms: [],
        };
      default:
        return state;
    }
  };
  
  
  export default bookingReducer;
  