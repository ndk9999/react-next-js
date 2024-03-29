import { createContext, useCallback, useReducer } from "react";
// import useDataFetching from "../hooks/useDataFetching";

export const ListsContext = createContext();

const initialState = {
    lists: [],
    list: {},
    loading: true,
    error: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'GET_LISTS_SUCCESS':
            return {
                ...state,
                lists: action.payload,
                loading: false
            };
        case 'GET_LISTS_ERROR':
            return {
                ...state,
                lists: [],
                loading: false,
                error: action.payload
            };
        case 'GET_LIST_SUCCESS':
            return {
                ...state,
                list: action.payload,
                loading: false
            };
        case 'GET_LIST_ERROR':
            return {
                ...state,
                list: {},
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export const ListsContextProvider = ({ children }) => {
    // const [loading, error, data] = useDataFetching('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists');

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchLists = useCallback(async () => {
        try {
            const response = await fetch('https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists');
            const result = await response.json();

            if (result) {
                dispatch({
                    type: 'GET_LISTS_SUCCESS',
                    payload: result
                });
            }
        } catch (err) {
            dispatch({
                type: 'GET_LISTS_ERROR',
                payload: err.message
            });
        }
    }, []);

    const fetchList = useCallback(async (listId) => {
        try {
            const response = await fetch(`https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}`);
            const result = await response.json();

            if (result) {
                dispatch({
                    type: 'GET_LIST_SUCCESS',
                    payload: result
                });
            }
        } catch (err) {
            dispatch({
                type: 'GET_LIST_ERROR',
                error: err.message
            });
        }
    }, []);

    return (
        <ListsContext.Provider value={{...state, fetchLists, fetchList}}>
            {children}
        </ListsContext.Provider>
    );
};

export default ListsContext;