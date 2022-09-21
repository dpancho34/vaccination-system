import React, { useReducer, createContext } from "react";

export const VaccinationContext = createContext();

const initialState = {
    userList: [],
    userObj: null,
    loading: false,
    error: null,
    pokemonOpt: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_USER":
        return {
          userList: [...state.userList, action.payload]
        };
      case "DELETE_USER":
        return {
          userList: state.userList.filter(
            user => user.id !== action.payload
          )
        };
      case "GET_USER_LIST":
        return {
          userList: action.payload,
          loading: true
        };
      case "UPDATE_USER":
        return {
          loading: false
        };
      case "NEW_POKEMON":
        return {...state, 
            pokemonOpt: action.payload.operation,
            userObj: action.payload.user
        };
      case "USER_OBJ":
        return {...state, 
          userObj: action.payload
        };
      default:
        throw new Error();
    }
  };

export const VaccinationContextProvider = props => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <VaccinationContext.Provider value={[dispatch, state]}>
      {props.children}
    </VaccinationContext.Provider>
  );
};