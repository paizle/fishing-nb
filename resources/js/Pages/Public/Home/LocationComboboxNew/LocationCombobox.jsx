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
	onFocus,
	onBlur,
	selectedRegionName,
}) {
	const ref = inputRef ? inputRef : useRef(null)

	const [filteredItems, setFilteredItems] = useState([])

	useEffect(() => {
		if (items) {
			setFilteredItems(items.filter((item) => filterByRegion(item, selectedRegionItem)))
		}
	}, [items, selectedRegionItem])

	const placeholder = selectedRegionName
		? 'Search by river or lake'
		: 'Search by river, lake or region'

	const {
		selectItem,
		getLabelProps,
		getMenuProps,
		getInputProps,
		highlightedIndex,
		getItemProps,
		isOpen,
		inputValue,
		openMenu,
	} = useCombobox({
		selectedItem,
		items: filteredItems ?? [],
		itemToString(item) {
			return item ? item.label : ''
		},
		stateReducer: (state, actionAndChanges) => {
			const { changes, type } = actionAndChanges
			console.log('***', { type }, { changes }, { state })

			switch (type) {
				case useCombobox.stateChangeTypes.InputClick:
					return {
						...changes,
						isOpen: true,
					}
				case useCombobox.stateChangeTypes.ItemClick:
					ref.current.blur()
					console.log('here?')
					onList(false, false)
					onChange(changes.selectedItem)
					return {
						...changes,
						inputValue: state.inputValue,
					}
				case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
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
			const hasFocus = document.activeElement === ref?.current
			onList(e.isOpen, hasFocus)
		},
		onSelectedItemChange(e) {
			console.log('no 1')
			onChange(e.selectedItem)
		},
		onInputValueChange(e) {
			console.log('no 2')
			const { stateChangeTypes } = useCombobox
			if (e.type === stateChangeTypes.InputBlur) {
				return
				/*
			} else if (
				e.type === stateChangeTypes.ItemClick ||
				e.type === stateChangeTypes.InputKeyDownEnter
			) {
			*/
				//} else if (e.type === stateChangeTypes.ControlledPropUpdatedSelectedItem) {
				//} else if (e.type === stateChangeTypes.InputChange) {
			} else {
			}
		},
	})

	const onInputBlur = (e) => {
		onBlur?.(e)
	}

	useEffect(() => {
		selectItem(selectedItem)
		const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
		setter.call(ref.current, inputValue)
	}, [selectedItem])

	const clearSearch = () => {
		const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
		setter.call(ref.current, '')
		ref.current.dispatchEvent(new Event('input', { bubbles: true }))
		onChange(null)
	}

	const scrollToInput = () => {
		const combobox = ref.current.closest('.LocationCombobox')
		const scrollTo = () => {
			const body = ref.current.closest('body')
			body.parentElement?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
		combobox.addEventListener(
			'transitionstart',
			() => combobox.addEventListener('transitionend', scrollTo, { once: true }),
			{ once: true },
		)
	}

	/*
	useEffect(() => {
		const combobox = ref?.current.closest('.LocationCombobox')

		const scrollTo = () => {
			const body = ref.current.closest('body')
			body.parentElement?.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}

		const transitionStartListener = () =>
			combobox.addEventListener('transitionend', scrollTo, { once: true })

		if (ref.current) {
			combobox.addEventListener('transitionstart', transitionStartListener, { once: true })
		}

		return () => {
			if (ref.current) {
				combobox.removeEventListener('transitionstart', transitionStartListener)
				combobox.removeEventListener('transitionend', scrollTo)
			}
		}
	}, [ref.current])
  */

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

	const hasFocus = document.activeElement === ref?.current

	return (
		<div className={`LocationCombobox ${className ? className : ''}`} onClick={scrollTo}>
			<div className="input" {...getLabelProps()}>
				<input
					id="input"
					placeholder={placeholder}
					{...getInputProps({
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
					onClick={clearSearch}
					onMouseDown={(e) => e.preventDefault()}
				>
					<XCircleIcon />
				</button>
			</div>

			{hasFocus && filteredItems === null && <LoadingSpinner />}

			<ul className={isOpen ? 'open' : ''} {...getMenuProps()}>
				{isOpen && filteredItems?.length === 0 && inputValue ? (
					<li className="empty">
						<span>(no waters found for: {inputValue})</span>
					</li>
				) : (
					filteredItems?.map((item, index) => (
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
