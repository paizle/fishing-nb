import { useReducer } from "react";
    
export default function useRest() {
    
    const initialState = {
        loading: false,
        error: null,
        data: null
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case actionTypes.FETCH_START:
            return { ...state, loading: true, error: null }
            case actionTypes.FETCH_SUCCESS:
            return { ...state, loading: false, data: action.payload }
            case actionTypes.FETCH_FAILURE:
            return { ...state, loading: false, error: action.payload }
            default:
            return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const get = async (url) => {
        dispatch({ type: actionTypes.FETCH_START })

        try {
            const response = await axios(url)
            dispatch({ type: actionTypes.FETCH_SUCCESS, payload: response.data })
            return response
            
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_FAILURE, payload: error.message })
            return error
        }
    }

    return { state, get }
}

const actionTypes = {
    FETCH_START: 'FETCH_START',
    FETCH_SUCCESS: 'FETCH_SUCCESS',
    FETCH_FAILURE: 'FETCH_FAILURE',
}