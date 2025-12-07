import './LocationCombobox.scss'
import { useMemo } from 'react'
import { useCombobox } from 'downshift'
import { useState, useRef, useEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '@/Components/LoadingSpinner/LoadingSpinner'

export default function LocationCombobox({
	items,
	selectedItem,
	selectedRegionItem,
	className = '',
	inputRef,
	onChange,
	onList,
}) {
	console.log('**', selectedItem)

	const ref = inputRef ? inputRef : useRef(null)

	const containerRef = useRef(null)

	const [filteredItems, setFilteredItems] = useState([])

	useEffect(() => {
		if (items) {
			setFilteredItems(items.filter((item) => filterByRegion(item, selectedRegionItem)))
		}
	}, [items, selectedRegionItem])

	const placeholder = selectedRegionItem
		? 'Search by river or lake'
		: 'Search by river, lake or region'

	const {
		getLabelProps,
		getMenuProps,
		getInputProps,
		selectedIndex,
		highlightedIndex,
		getItemProps,
		isOpen,
		inputValue,
		openMenu,
		closeMenu,
	} = useCombobox({
		selectedItem,
		items: filteredItems ?? [],
		itemToString(item) {
			return item ? item.label : ''
		},
		stateReducer: (state, actionAndChanges) => {
			const { changes, type } = actionAndChanges

			switch (type) {
				case useCombobox.stateChangeTypes.InputBlur:
					console.log('blurred. active:', document.activeElement)
					return state
				case useCombobox.stateChangeTypes.InputClick:
					return {
						...changes,
						isOpen: true,
					}
				case useCombobox.stateChangeTypes.ItemClick:
					return {
						...changes,
						inputValue: state.inputValue,
					}
				case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
					return {
						...changes,
						inputValue: state.inputValue,
					}
				case useCombobox.stateChangeTypes.FunctionSelectItem:
					return {
						...changes,
						inputValue: state.inputValue,
					}

				default:
					return changes
			}
		},
		onIsOpenChange(e) {
			const hasFocus =
				document.activeElement === ref?.current ||
				document.activeElement === containerRef?.current
			onList(e.isOpen, hasFocus)
		},
		onSelectedItemChange(e) {
			console.log('item changed', e.selectedItem)
			onChange(e.selectedItem)
		},
		onInputValueChange(e) {
			console.log('input changed', e.inputValue)
		},
	})

	console.log('does this change', selectedIndex, highlightedIndex)

	const hasFocus =
		document.activeElement === ref?.current || document.activeElement === containerRef?.current

	const clearSearch = () => {
		console.log('clear')
		if (!selectedItem || isOpen) {
			const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
			setter.call(ref.current, '')
			ref.current.dispatchEvent(new Event('input', { bubbles: true }))
		}
		if (selectedItem) {
			onChange(null)
		}
		setTimeout(() => {
			ref.current.focus()
		}, 0)
	}

	useEffect(() => {
		if (items) {
			const newFilteredItems = inputValue
				? items.filter(
						(item) =>
							filterByRegion(item, selectedRegionItem) &&
							filterByText(item, inputValue),
					)
				: items.filter((item) => filterByRegion(item, selectedRegionItem))
			setFilteredItems(newFilteredItems)
		} else {
			setFilteredItems(null)
		}
	}, [inputValue, items])

	const focusTrap = () => {
		if (document.activeElement !== containerRef.current) {
			containerRef.current.focus()
		}
	}

	return (
		<div
			tabIndex="0"
			ref={containerRef}
			onClick={(e) => {
				if (!containerRef.current.contains(e.target) || e.target === containerRef.current) {
					containerRef.current.blur()
				}
			}}
			onBlur={(e) => {
				if (e.relatedTarget !== containerRef.current) {
					closeMenu()
				}
			}}
			className={`LocationCombobox ${className ? className : ''}`}
		>
			<div className="input" {...getLabelProps()}>
				<input
					id="input"
					placeholder={placeholder}
					{...getInputProps({
						onFocus: () => {
							console.log('focus')
							openMenu()
						},
						onBlur: (e) => {
							console.log({ e })
						},
						ref,
					})}
				/>
				{!isOpen && selectedItem && (
					<div className="selected-value">{selectedItem.label}</div>
				)}
				<button
					className="clear-input"
					aria-label="Clear Search"
					type="button"
					onMouseDown={clearSearch}
				>
					<XCircleIcon />
				</button>
			</div>

			{hasFocus && filteredItems === null && <LoadingSpinner />}

			<ul onTouchMove={focusTrap} className={isOpen ? 'open' : ''} {...getMenuProps()}>
				{isOpen && filteredItems?.length === 0 && inputValue ? (
					<li className="empty">
						<span>(no waters found)</span>
					</li>
				) : (
					filteredItems?.map((item, index) => {
						console.log(item)
						return (
							<li
								className={`${item.value.waterId === selectedItem?.value.waterId ? 'selected' : ''} ${index === highlightedIndex ? 'highlighted' : ''}`}
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
						)
					})
				)}
			</ul>
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
