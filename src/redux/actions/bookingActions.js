// actions/bookingActions.js
export const addRoom = (room) => ({
    type: 'ADD_ROOM',
    payload: room,
  });
  
  export const removeRoom = (room) => ({
    type: 'REMOVE_ROOM',
    payload: room,
  });
  
  export const clearRooms = () => ({
    type: 'CLEAR_ROOMS',
  });
  