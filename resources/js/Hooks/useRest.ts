import axios from 'axios'
import { useReducer } from 'react'

type State = {
	loading: boolean
	error: string | null
	data: any
}

function getErrorMessage(error: unknown): string {
	if (axios.isAxiosError(error)) {
		if (error.response) {
			return `Request failed (HTTP ${error.response.status}).`
		}
		return error.message || 'Network request failed.'
	}
	if (error instanceof Error) {
		return error.message
	}
	return 'Request failed.'
}

export default function useRest(apiLastModified: string): {
	state: State
	get: (url: string) => Promise<any | null>
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
			const params = {
				nocache: apiLastModified ? Date.parse(apiLastModified) : null,
			}
			const response = await axios.get(url, { params })
			dispatch({
				type: ActionTypes.FETCH_SUCCESS,
				payload: response.data,
			})
			return response
		} catch (error: unknown) {
			const message = getErrorMessage(error)
			console.error(`[useRest] GET ${url} failed: ${message}`, error)
			dispatch({
				type: ActionTypes.FETCH_FAILURE,
				payload: message,
			})
			return null
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
	type: ActionTypes
	payload: any | null
}
