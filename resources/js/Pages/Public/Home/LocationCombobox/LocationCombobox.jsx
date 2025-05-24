import './LocationCombobox.scss'
import { useMemo } from 'react'
import Downshift, { useCombobox } from 'downshift'
import { useState, useRef, useEffect, useLayoutEffect, use, useReducer } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function LocationCombobox({
	className = '',
	inputRef,
	locations = {},
	onChange,
	onFocus,
	onBlur,
}) {
	const [inputValue, setInputValue] = useState('')

	const ref = inputRef ? inputRef : useRef(null)

	useEffect(() => {
		if (ref.current) {
			if (onFocus) {
				ref.current.addEventListener('focus', onFocus)
			}
			if (onBlur) {
				ref.current.addEventListener('blur', onBlur)
			}

			return () => {
				ref?.current?.removeEventListener('focus', onFocus)
				ref?.current?.removeEventListener('blur', onBlur)
			}
		}
	}, [ref.current])

	const placeholder = 'Search by river, lake or region'

	const items = useMemo(
		() =>
			(locations ?? []).map((location) => {
				const item = {}
				item.value = {}
				item.value.regionId = location.region_id
				if (location.water_id) {
					item.value.waterId = location.water_id
					item.label = location.water.name
					item.fullName = location.region.name + ', ' + location.water.name
				} else {
					item.label = location.region.name
					item.fullName = location.region.name
				}
				return item
			}),
		[locations],
	)

	const filteredItems = useMemo(
		() => (items ?? []).filter((item) => filterByText(item, inputValue)),
		[items, inputValue],
	)

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
			if (e.type === stateChangeTypes.InputBlur) {
				return
			} else if (
				e.type === stateChangeTypes.ItemClick ||
				e.type === stateChangeTypes.InputKeyDownEnter
			) {
				onChange(e.selectedItem)
			} else if (e.type === stateChangeTypes.InputChange) {
				setInputValue(e.inputValue)
			} else {
				onChange(e.selectedItem)
			}
		},
	})

	const clearSearch = () => {
		setInputValue('')
		ref.current.click()
	}

	const scrollToInput = (e) => {
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
					onFocus={scrollToInput}
				/>
				<button aria-label="Clear Search" type="button" onClick={clearSearch}>
					<XCircleIcon />
				</button>
			</div>

			<ul className={isOpen ? 'open' : ''} {...getMenuProps()}>
				{isOpen &&
					filteredItems.map((item, index) => (
						<li
							className={`${index === highlightedIndex ? 'highlighted' : ''}`}
							key={item.value.regionId + '-' + item.value.waterId}
							{...getItemProps({ item, index })}
						>
							<span>
								{item.value.waterId ? (
									item.label
								) : (
									<span className="flex justify-center font-bold">
										{item.label}
									</span>
								)}
							</span>
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
