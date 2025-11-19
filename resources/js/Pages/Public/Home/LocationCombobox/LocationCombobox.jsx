import './LocationCombobox.scss'
import { useMemo } from 'react'
import { useCombobox } from 'downshift'
import { useState, useRef, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

export default function LocationCombobox({
	className = '',
	inputRef,
	locations = {},
	onChange,
	onFocus,
	onBlur,
	selectedLocation,
	selectedRegionName,
	onInteract,
}) {
	const [openList, setOpenList] = useState(false)

	const [userSearch, setUserSearch] = useState('')

	const ref = inputRef ? inputRef : useRef(null)

	const placeholder = selectedRegionName
		? 'Search by river or lake'
		: 'Search by river, lake or region'

	const onInputFocus = (e) => {
		scrollToInput()
		onFocus?.(e)
		setOpenList(true)
	}

	const onInputBlur = (e) => {
		onBlur?.(e)
		setOpenList(false)
	}

	const [items, selectedRegionItem] = useMemo(() => {
		let selected = null

		const list = (locations ?? []).map((location) => {
			const item = {
				value: {
					regionId: location.region_id,
					waterId: location.water_id ?? null,
				},
				label: location.water_id ? location.water.name : location.region.name,
				fullName: location.water_id
					? `${location.region.name}, ${location.water.name}`
					: location.region.name,
			}

			if (
				selected == null &&
				item.value.waterId === null &&
				item.label === selectedRegionName
			) {
				selected = item
			}

			return item
		})

		return [list, selected]
	}, [locations, selectedRegionName])

	const filteredItems = useMemo(
		() =>
			(items ?? []).filter(
				(item) =>
					filterByRegion(item, selectedRegionItem) && filterByText(item, userSearch),
			),
		[items, userSearch, selectedRegionItem, filterByRegion, filterByText],
	)

	const hasFocus = document.activeElement === ref?.current

	const [isInit, setIsInit] = useState(true)

	const shouldListOpen = userSearch !== selectedLocation?.label && openList

	useEffect(() => {
		if (!isInit) {
			onInteract(hasFocus, shouldListOpen)
		}
		setIsInit(false)
	}, [openList, hasFocus])

	const setUserSearchToSelection = (selectedItem) => {
		if (selectedItem && selectedItem.value?.waterId) {
			setUserSearch(selectedItem?.label)
		} else {
			setUserSearch('')
		}
	}

	const {
		getLabelProps,
		getMenuProps,
		getInputProps,
		highlightedIndex,
		getItemProps,
		selectedItem,
		isOpen,
		inputValue,
	} = useCombobox({
		selectedItem: selectedLocation,
		isOpen: shouldListOpen,
		inputValue: userSearch,
		items: filteredItems,
		itemToString(item) {
			return item ? item.label : ''
		},
		onSelectedItemChange(e) {
			onChange(e.selectedItem)
			setUserSearchToSelection(e.selectedItem)
			setOpenList(false)
		},
		onInputValueChange(e) {
			const { stateChangeTypes } = useCombobox
			if (e.type === stateChangeTypes.InputBlur) {
				return
				/*
			} else if (
				e.type === stateChangeTypes.ItemClick ||
				e.type === stateChangeTypes.InputKeyDownEnter
			) {
			*/
			} else if (e.type === stateChangeTypes.InputChange) {
				setUserSearch(e.inputValue)
				setOpenList(true)
			} else {
				onChange(e.selectedItem)
				setUserSearchToSelection(e.selectedItem)
				setOpenList(false)
			}
		},
	})

	const clearSearch = (e) => {
		e.preventDefault()
		if (inputValue) {
			setUserSearch('')
		}
		if (selectedItem) {
			onChange(null)
		}
		ref.current.dispatchEvent(new Event('mousedown', e))
		setOpenList(true)
	}

	const scrollTo = () => {
		/*
    const combobox = inputRef.current.closest('.LocationCombobox')
		combobox.parentElement?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})
      */
	}

	const scrollToInput = () => {
		/*
		const combobox = inputRef.current.closest('.LocationCombobox')
		combobox.addEventListener(
			'transitionstart',
			() => combobox.addEventListener('transitionend', scrollTo, { once: true }),
			{ once: true },
		)
      */
	}

	return (
		<div className={`LocationCombobox ${className ? className : ''}`} onClick={scrollTo}>
			<div className="input" {...getLabelProps()}>
				<input
					placeholder={placeholder}
					{...getInputProps({ ref })}
					onFocus={(e) => {
						onInputFocus(e)
						setOpenList(true)
					}}
					onBlur={(e) => {
						if (selectedLocation && selectedLocation.label !== inputValue) {
							setInputValue(selectedLocation.label)
						}
						onInputBlur(e)
					}}
					onMouseDown={() => {
						const hasFocus = document.activeElement === ref.current
						setOpenList(true)
					}}
				/>
				<button
					className="clear-input"
					aria-label="Clear Search"
					type="button"
					onClick={clearSearch}
					onMouseDown={(e) => e.preventDefault()}
				>
					<XCircleIcon />
				</button>
			</div>

			<ul className={isOpen ? 'open' : ''} {...getMenuProps()}>
				{isOpen && filteredItems.length === 0 && inputValue ? (
					<li>
						<span>(not found)</span>
					</li>
				) : (
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
					))
				)}
			</ul>
			{isOpen && filteredItems && filteredItems.length === 0 && <div>no items</div>}
		</div>
	)
}

const filterByRegion = (item, selectedRegion) => {
	return (
		!selectedRegion ||
		(item.value.regionId === selectedRegion.value.regionId && item.value.waterId)
	)
}

const filterByText = (item, inputValue) => {
	if (!inputValue) return true
	const inputChunks = inputValue.split(' ').map((chunk) => chunk.toLowerCase())
	const labelChunks = item.label.split(' ').map((chunk) => chunk.toLowerCase())
	return inputChunks.every((inputChunk) =>
		labelChunks.some((labelChunk) => labelChunk.includes(inputChunk)),
	)
}
