// reducers/bookingReducer.js
const initialState = {
    createRoom: [],
  };
  
  const roomReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_ROOM':
          return {
            ...state,
            createRoom: [
              ...state.createRoom,
              {
                room: action.payload,
              }
            ],
          };
      case 'REMOVE_ROOM':
        return {
          ...state,
          createRoom: state.createRoom.filter(room => room.id !== action.payload.id),
        };
      case 'CLEAR_ROOMS':
        return {
          ...state,
          createRoom: [],
        };
      default:
        return state;
    }
  };
  
  
  export default roomReducer;
  