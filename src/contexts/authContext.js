import React, { useReducer, createContext } from "react";

export const AuthContext = createContext();

const initialState = {
    user: null,
    loading: false,
    error: null,
    userData: null,
    userRole: null
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {...state,
          user: action.payload
        };
      case "GET_ROLE":
          return {...state, 
            userRole: action.payload
          };
      case "SAVE_USER_DATA":
        return {...state, 
          userData: action.payload
        };
      case "LOGOUT":
        return {
          user: null
        };
      default:
        throw new Error();
    }
  };

export const AuthContextProvider = props => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={[dispatch, state]}>
      {props.children}
    </AuthContext.Provider>
  );
};