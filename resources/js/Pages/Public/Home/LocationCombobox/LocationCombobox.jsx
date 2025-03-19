import './LocationCombobox.scss'
import Downshift, { useCombobox } from 'downshift'
import { useState, useRef, useEffect, useLayoutEffect, use, useReducer } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function LocationCombobox({
	className = '',
	placeholder,
	inputRef,
	locations = {},
	onChange,
	exportState = () => undefined,
}) {
	const [inputValue, setInputValue] = useState('')

	const [state, dispatch] = useReducer(reducer, initialState)
	useEffect(() => {
		exportState(state)
	}, [state])

	const ref = inputRef ? inputRef : useRef(null)

	useEffect(() => {
		if (ref.current) {
			const onFocus = () => dispatch({ type: ACTION_TYPES.FOCUS, payload: true })
			const onBlur = () => dispatch({ type: ACTION_TYPES.FOCUS, payload: false })
			ref.current.addEventListener('focus', onFocus)
			ref.current.addEventListener('blur', onBlur)
			return () => {
				ref?.current?.removeEventListener('focus', onFocus)
				ref?.current?.removeEventListener('blur', onBlur)
			}
		}
	}, [ref])

	const items = Object.entries(locations ?? {}).map(([key, value]) => ({
		value,
		label: key,
	}))

	const filteredItems = (items ?? []).filter((item) => filterByText(item, inputValue))

	const {
		isOpen,
		getLabelProps,
		getMenuProps,
		getInputProps,
		highlightedIndex,
		getItemProps,
		selectedItem,
		stateChangeTypes,
	} = useCombobox({
		inputValue,
		items: filteredItems,
		itemToString(item) {
			return item ? item.label : ''
		},
		onInputValueChange(e) {
			const { stateChangeTypes } = useCombobox
			if (
				e.type === stateChangeTypes.ItemClick ||
				e.type === stateChangeTypes.InputKeyDownEnter
			) {
				onChange(e.selectedItem)
			} else {
				setInputValue(e.inputValue)
			}
		},
	})

	useEffect(() => {
		if (state.isOpen !== isOpen) {
			dispatch({ type: ACTION_TYPES.OPEN, payload: isOpen })
		}
	}, [isOpen])

	const clearSearch = () => {
		setInputValue('')
	}

	const onFocus = (e) => {
		const target = e.target
		const combobox = target.closest('.LocationCombobox')
		combobox.addEventListener(
			'transitionstart',
			() =>
				combobox.addEventListener(
					'transitionend',
					() =>
						target.parentElement?.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
						}),
					{ once: true },
				),
			{ once: true },
		)
	}

	return (
		<div className={`LocationCombobox ${className ? className : ''}`}>
			<div className="input" {...getLabelProps()}>
				<input
					placeholder={placeholder}
					value={inputValue}
					{...getInputProps({ ref })}
					onFocus={onFocus}
				/>
				<button aria-label="Clear Search input" type="button" onClick={clearSearch}>
					<XCircleIcon />
				</button>
			</div>

			<ul className={isOpen ? 'open' : ''} {...getMenuProps()}>
				{isOpen &&
					filteredItems.map((item, index) => (
						<li
							className={`${selectedItem === item ? 'selected' : ''} ${index === highlightedIndex ? 'highlighted' : ''}`}
							key={item.value.regionId + '-' + item.value.waterId}
							{...getItemProps({ item, index })}
						>
							<span>{item.label}</span>
						</li>
					))}
			</ul>
		</div>
	)
}

const initialState = {
	hasFocus: false,
	isOpen: false,
}

const ACTION_TYPES = {
	FOCUS: 'FOCUS',
	OPEN: 'OPEN',
}

function reducer(state, action) {
	switch (action.type) {
		case ACTION_TYPES.FOCUS:
			return { ...state, hasFocus: action.payload }
		case ACTION_TYPES.OPEN:
			return { ...state, isOpen: action.payload }
		default:
			return state
	}
}

const filterByText = (item, inputValue) => {
	if (!inputValue) return true
	const inputChunks = inputValue.split(' ').map((chunk) => chunk.toLowerCase())
	const labelChunks = item.label.split(' ').map((chunk) => chunk.toLowerCase())
	return inputChunks.every((inputChunk) =>
		labelChunks.some((labelChunk) => labelChunk.includes(inputChunk)),
	)
}
