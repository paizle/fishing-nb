import { useReducer } from 'react'

type State = {
	loading: boolean
	error: string | null,
	data: any
}

export default function useRest(apiLastModified: string): {
  state: State
  get: (url: string) => Promise<any>
} {
	
	const initialState: State = {
		loading: false,
		error: null,
		data: null,
	}

	const reducer = (state: State, action: Action) => {
		switch (action.type) {
			case ActionTypes.FETCH_START:
				return { ...state, loading: true, error: null }
			case ActionTypes.FETCH_SUCCESS:
				return { ...state, loading: false, data: action.payload }
			case ActionTypes.FETCH_FAILURE:
				return { ...state, loading: false, error: action.payload }
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	const get = async (url: string) => {
		dispatch({ type: ActionTypes.FETCH_START })

		try {
			const params = { nocache: apiLastModified ? Date.parse(apiLastModified) : null }
			const response = await axios.get(url, {params})
			dispatch({
				type: ActionTypes.FETCH_SUCCESS,
				payload: response.data,
			})
			return response
		} catch (error: any) {
			dispatch({
				type: ActionTypes.FETCH_FAILURE,
				payload: error.message,
			})
			return error
		}
	}

	return { state, get }
}

enum ActionTypes {
	FETCH_START = 'FETCH_START',
	FETCH_SUCCESS = 'FETCH_SUCCESS',
	FETCH_FAILURE = 'FETCH_FAILURE',
}

type Action = {
	type: ActionTypes,
	payload: any | null
}
