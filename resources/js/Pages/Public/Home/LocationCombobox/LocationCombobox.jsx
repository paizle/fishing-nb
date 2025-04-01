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
	const [hasFocus, setHasFocus] = useState(false)

	const [regionFilterItem, setRegionFilterItem] = useState(null)

	const [inputValue, setInputValue] = useState('')

	const ref = inputRef ? inputRef : useRef(null)

	const placeholder = selectedRegion
		? 'Search by river or lake'
		: 'Search by river, lake or region'

	const onInputFocus = () => {
		setHasFocus(true)
		scrollToInput()
	}

	const onInputBlur = () => {
		setHasFocus(false)
	}

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
		[items, inputValue, selectedRegion, filterByRegion, filterByText],
	)

	useEffect(() => {
		const regionItem = filteredItems.find(
			(item) => item.value.regionId === selectedRegion && item.value.waterId === undefined,
		)

		if (regionItem) {
			setRegionFilterItem(regionItem)
		} else {
			setRegionFilterItem(null)
		}
	}, [selectedRegion, filteredItems])

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

	const {
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
			selectRegion(null)
		}
		ref.current.click()
	}

	const scrollToInput = () => {
		const combobox = inputRef.closest('.LocationCombobox')
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

	const renderItemLabel = (item) => {
		let result = item.label
		if (regionFilterItem) {
			if (regionFilterItem.value.regionId === item.value.regionId && !item.value.waterId) {
				return <span className="filter-item">{result}</span>
			} else {
				result = result.substring(regionFilterItem.label.length + 2)
			}
		}
		return <span>{result}</span>
	}

	return (
		<div className={`LocationCombobox ${className ? className : ''}`}>
			<div className="input" {...getLabelProps()}>
				{regionFilterItem ? (
					<button
						className="region-filter"
						onClick={() => setShowMap(true)}
						aria-label="Filter by Region"
					>
						<span>{renderFilterText(regionFilterItem.label)}</span>
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
					onFocus={() => onInputFocus()}
					onBlur={() => onInputBlur()}
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

			<ul className={hasFocus ? 'open' : ''} {...getMenuProps()}>
				{hasFocus &&
					filteredItems.map((item, index) => (
						<li
							className={`${selectedItem === item ? 'selected' : ''} ${index === highlightedIndex ? 'highlighted' : ''}`}
							key={item.value.regionId + '-' + item.value.waterId}
							{...getItemProps({ item, index })}
						>
							<span>{renderItemLabel(item)}</span>
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

function renderFilterText(filterText) {
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
