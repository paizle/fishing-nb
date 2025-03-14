import './Combobox.scss'
import Downshift, { useCombobox } from 'downshift'
import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { XCircleIcon } from '@heroicons/react/24/outline'

const filterByText = (item, inputValue) => {
	if (!inputValue) return true
	const inputChunks = inputValue.split(' ').map((chunk) => chunk.toLowerCase())
	const labelChunks = item.label.split(' ').map((chunk) => chunk.toLowerCase())
	return inputChunks.every((inputChunk) =>
		labelChunks.some((labelChunk) => labelChunk.includes(inputChunk)),
	)
}

export default function Combobox({
	items = [],
	placeholder,
	//onChange,
	onFocus,
	inputRef,
	className = '',
	inputValue = '',
	//selectedItem,
	onInputValueChange,
	onSelectedItemChange,
}) {
	const [text, setText] = useState('')

	const filteredItems = (items ?? []).filter((item) => filterByText(item, text))

	const ref = inputRef ? inputRef : useRef(null)

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
		inputValue: text,
		items,
		itemToString(item) {
			return item ? item.label : ''
		},
		onInputValueChange(e) {
			const test = stateChangeTypes
			if (e.type === '__item_click__' || e.type === '__input_keydown_enter__') {
				onSelectedItemChange(e.selectedItem)
			} else {
				//if (e.type === '__input_change__' || e.type === '__input_keydown_escape__') {
				setText(e.inputValue)
			}
		},
	})

	const clearSearch = () => {
		ref.current.click()
		setText('')
	}

	return (
		<div className={`Combobox ${className ? className : ''}`}>
			<div className="input" {...getLabelProps()}>
				<input placeholder={placeholder} {...getInputProps({ ref })} />
				<button aria-label="Clear Search input" type="button" onClick={clearSearch}>
					<XCircleIcon />
				</button>
			</div>

			<ul className={isOpen && filteredItems.length ? 'open' : ''} {...getMenuProps()}>
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

	return (
		<Downshift
			className={className}
			onChange={handleChange}
			itemToString={(item) => (item ? item?.label || item.value : '')}
			selectedItem={selectedItem}
			inputValue={inputValue}
			onInputValueChange={onInputValueChange}
			selectedItemChanged={onSelectedItemChange}
		>
			{({
				getInputProps,
				getItemProps,
				getLabelProps,
				getMenuProps,
				isOpen,
				inputValue,
				selectedItem,
				getRootProps,
			}) => {
				const filterByText = (item) => {
					if (!inputValue) return true
					const inputChunks = inputValue.split(' ').map((chunk) => chunk.toLowerCase())
					const labelChunks = item.label.split(' ').map((chunk) => chunk.toLowerCase())
					return inputChunks.every((inputChunk) =>
						labelChunks.some((labelChunk) => labelChunk.includes(inputChunk)),
					)
				}
				const filteredItems = items.filter(filterByText)
				return (
					<div
						className={`Combobox ${isInit ? 'init' : ''} ${hasFocus ? 'open' : ''} ${className}`}
					>
						<label {...getLabelProps()}>
							{label}
							<div
								className="input-wrapper"
								{...getRootProps({}, { suppressRefError: true })}
							>
								<input
									{...getInputProps()}
									placeholder={placeholder}
									onFocus={handleFocus}
									onClick={handleFocus}
									onBlur={handleBlur}
									ref={ref}
								/>
							</div>
						</label>
						<ul className={`results ${hasFocus ? 'open' : ''}`} {...getMenuProps()}>
							{filteredItems.length && hasFocus ? (
								filteredItems.map((item, index) => (
									<li
										key={item?.label || item.value}
										className="item"
										{...getItemProps({
											index,
											item,
											style: {
												fontWeight:
													selectedItem === item ? 'bold' : 'normal',
											},
										})}
									>
										{item?.label || item.value}
									</li>
								))
							) : (
								<li className="item">(no results)</li>
							)}
						</ul>
					</div>
				)
			}}
		</Downshift>
	)
}
