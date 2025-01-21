import './Combobox.scss'
import Downshift from 'downshift'

export default function Combobox({items = [], label=null, placeholder=null, onFocus=() => null}) {

    console.log(items)

    return (

        <Downshift
            onChange={selection =>
                alert(selection ? `You selected ${selection?.label || selection.value}` : 'Selection Cleared')
            }
            itemToString={item => (item ? (item?.label || item.value) : '')}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                getRootProps,
            }) => (
                <div className="Combobox">
                    <label {...getLabelProps()}>
                        {label}
                        <div 
                            className="input-wrapper"
                            {...getRootProps({}, {suppressRefError: true})}
                        >
                            <input 
                                {...getInputProps()}
                                placeholder={placeholder}
                                onFocus={onFocus}
                                onClick={onFocus}
                            />
                        </div>
                    </label>
                    <ul className={`results ${isOpen || true ? 'open' : ''}`} {...getMenuProps()}>
                        {items.length
                            ? items
                                .filter(item => !inputValue || (item?.label || item.value).toLowerCase().includes(inputValue.toLowerCase()))
                                .map((item, index) => (
                                    <li key={item?.label || item.value} className="item"
                                        {...getItemProps({
                                            index,
                                            item,
                                            style: {
                                                backgroundColor:
                                                highlightedIndex === index ? 'lightgray' : 'white',
                                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                                            },
                                        })}
                                    >
                                        {item?.label || item.value}
                                    </li>
                                ))
                            : Array.from({length: 50}, () => null).map((_, index) => (<li key={index}></li>))}
                    </ul>
                </div>
            )}
        </Downshift>
    )
}