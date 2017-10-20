/**
 * ACTION TYPES SUPPORTED BY
 * dv4list component
 */

export const actionType = {
  //action emitted by save button
  SAVE: <string>"SAVE_LIST_ITEM",    
  //action when data is saved
  SAVE_COMPLETED: <string>"SET_ITEMS_COMPLETED",
  //SET_ITEMS: <string>"SET_ITEMS",
  SET_ITEMS_COMPLETED: <string>"SET_ITEMS_COMPLETED",
  //action emited when user starts editing an item
  EDIT_START: <string>"EDIT_LIST_ITEM",
  //action emitted by delete button
  DELETE: <string>"DELETE_LIST_ITEM",
  //action emitted after records is deleted from database
  DELETE_COMPLETED: <string>"DELETE_LIST_ITEM_COMPLETED",
  //GET_SCHEMA: <string>"GET_SCHEMA",
  SET_SCHEMA: <string>"SET_SCHEMA",
  //GET_RAW_DATA: <string>"GET_RAW_DATA",
  //SET_RAW_DATA: <string>"SET_RAW_DATA",
  //PREP_DATA: <string>"PREP_DATA",
  //action to load new data into list
  SET_DATA: <string>"SET_DATA",
  ERROR: <string>"ERROR",
  //SORT_DATA: <string>"SORT_DATA"
}