import './LocationCombobox.scss'
import { useMemo } from 'react'
import Downshift, { useCombobox } from 'downshift'
import { useState, useRef, useEffect, useLayoutEffect, use, useReducer } from 'react'

import { XCircleIcon, MapPinIcon as MapPinIconOutline } from '@heroicons/react/24/outline'

import { MapPinIcon } from '@heroicons/react/24/solid'

export default function LocationCombobox({
	className = '',
	inputRef,
	locations = {},
	onChange,
	onFocus,
	onBlur,
	selectedRegion,
	selectRegion,
	setShowMap,
}) {
	const [filterText, setFilter] = useState(null)

	useEffect(() => {
		const regionItem = Object.entries(locations).filter(
			([key, location]) =>
				location.regionId === selectedRegion && location.waterId === undefined,
		)

		if (regionItem.length) {
			setFilter(regionItem[0][0])
		} else {
			setFilter('')
		}
	}, [selectedRegion])

	const renderFilterText = (filterText) => {
		switch (filterText) {
			case 'Inner Bay of Fundy':
				return (
					<>
						Inner Bay
						<br />
						of Fundy
					</>
				)
			case 'Lower Saint John':
				return (
					<>
						Lower
						<br />
						Saint John
					</>
				)
			case 'Upper Saint John':
				return (
					<>
						Upper
						<br />
						Saint John
					</>
				)
			default:
				return filterText
		}
	}

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

	const placeholder = filterText ? 'Search by river or lake' : 'Search by river, lake or region'

	const items = useMemo(
		() =>
			Object.entries(locations ?? {}).map(([key, value]) => ({
				value,
				label: key,
			})),
		[locations],
	)

	const filteredItems = useMemo(
		() =>
			(items ?? []).filter(
				(item) => filterByRegion(item, selectedRegion) && filterByText(item, inputValue),
			),
		[items, inputValue, selectedRegion],
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
		if (inputValue) {
			setInputValue('')
		} else {
			selectedRegion = null
			selectRegion(null)
		}
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

	const renderItemLabel = (itemLabel) => {
		let result = itemLabel
		if (filterText) {
			result = result.substring(filterText.length)
			if (!result.trim()) {
				result = itemLabel
			} else {
				result = result.substring(2)
			}
		}
		return result
	}

	return (
		<div className={`LocationCombobox ${className ? className : ''}`}>
			<div className="input" {...getLabelProps()}>
				{filterText ? (
					<button
						className="region-filter"
						onClick={() => setShowMap(true)}
						aria-label="Filter by Region"
					>
						<span>{renderFilterText(filterText)}</span>
					</button>
				) : (
					<button
						className="select-region"
						onClick={() => setShowMap(true)}
						title="Filter by Region"
					>
						<MapPinIcon />
					</button>
				)}
				<input
					placeholder={placeholder}
					value={inputValue}
					{...getInputProps({ ref })}
					onFocus={scrollToInput}
				/>
				<button
					className="clear-input"
					aria-label="Clear Search"
					type="button"
					onClick={clearSearch}
				>
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
							<span>{renderItemLabel(item.label)}</span>
						</li>
					))}
			</ul>
		</div>
	)
}

const filterByRegion = (item, selectedRegion) => {
	return !selectedRegion || item.value.regionId === selectedRegion
}

const filterByText = (item, inputValue) => {
	if (!inputValue) return true
	const inputChunks = inputValue.split(' ').map((chunk) => chunk.toLowerCase())
	const labelChunks = item.label.split(' ').map((chunk) => chunk.toLowerCase())
	return inputChunks.every((inputChunk) =>
		labelChunks.some((labelChunk) => labelChunk.includes(inputChunk)),
	)
}
