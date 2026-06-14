import './LocationCombobox.scss'
import { useMemo } from 'react'
import { useCombobox } from 'downshift'
import { useState, useRef, useEffect } from 'react'
import normalizeFishId from '@/Util/normalizeFishId'
import locationSlug from '@/Util/locationSlug'

import { XCircleIcon } from '@heroicons/react/24/outline'

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

	const [inputValue, setInputValue] = useState('')

	const internalRef = useRef(null)
	const ref = inputRef ?? internalRef

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
			(locations ?? []).map((location) => {
				const item = {}
				item.value = {}
				item.value.regionId = location.region_id
				item.value.regionName = location.region.name
				item.value.regionSlug = locationSlug(location.region.name)
				if (location.water_id) {
					item.value.waterId = location.water_id
					item.value.waterName = location.water.name
					item.value.waterSlug = locationSlug(location.water.name)
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

	const regionFilterItem = useMemo(() => {
		const regionId = normalizeFishId(selectedRegion)
		if (regionId === null) {
			return null
		}
		return (
			(items ?? []).find(
				(item) =>
					normalizeFishId(item.value.regionId) === regionId &&
					item.value.waterId === undefined,
			) ?? null
		)
	}, [items, selectedRegion])

	const filteredItems = useMemo(
		() =>
			(items ?? []).filter((item) => {
				if (!filterByRegion(item, selectedRegion)) {
					return false
				}
				if (item.value.waterId === undefined) {
					return shouldShowRegionItem(item, items, inputValue, selectedRegion)
				}
				return filterByText(item, inputValue)
			}),
		[items, inputValue, selectedRegion],
	)

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

	const { getLabelProps, getMenuProps, getInputProps, highlightedIndex, getItemProps } =
		useCombobox({
			inputValue,
			items: filteredItems,
			itemToString(item) {
				return item ? item.label : ''
			},
			onSelectedItemChange({ selectedItem }) {
				if (selectedItem) {
					onChange(selectedItem)
				}
			},
			onInputValueChange({ inputValue: newValue, type }) {
				const { stateChangeTypes } = useCombobox
				if (type === stateChangeTypes.InputBlur) {
					return
				}
				if (type === stateChangeTypes.InputChange) {
					setInputValue(newValue ?? '')
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

	const scrollTo = () => {
		const combobox = ref.current?.closest('.LocationCombobox')
		combobox?.parentElement?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
	}

	const scrollToInput = () => {
		const combobox = ref.current?.closest('.LocationCombobox')
		if (!combobox) {
			return
		}
		combobox.addEventListener(
			'transitionstart',
			() => combobox.addEventListener('transitionend', scrollTo, { once: true }),
			{ once: true },
		)
	}

	return (
		<div className={`LocationCombobox ${className ? className : ''}`} onClick={scrollTo}>
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
							className={`${index === highlightedIndex ? 'highlighted' : ''}`}
							key={`${item.value.regionId}-${item.value.waterId ?? 'region'}`}
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

const filterByRegion = (item, selectedRegion) => {
	const regionId = normalizeFishId(selectedRegion)
	if (regionId === null) {
		return true
	}
	return normalizeFishId(item.value.regionId) === regionId
}

const filterByText = (item, inputValue) => {
	if (!inputValue) return true
	const inputChunks = inputValue.split(' ').map((chunk) => chunk.toLowerCase())
	const labelChunks = item.label.split(' ').map((chunk) => chunk.toLowerCase())
	return inputChunks.every((inputChunk) =>
		labelChunks.some((labelChunk) => labelChunk.includes(inputChunk)),
	)
}

const shouldShowRegionItem = (item, items, inputValue, selectedRegion) => {
	if (filterByText(item, inputValue)) {
		return true
	}
	const regionId = normalizeFishId(item.value.regionId)
	return (items ?? []).some(
		(other) =>
			other.value.waterId !== undefined &&
			normalizeFishId(other.value.regionId) === regionId &&
			filterByRegion(other, selectedRegion) &&
			filterByText(other, inputValue),
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
