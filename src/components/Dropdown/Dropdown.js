import React,{useState} from 'react';
import {array, bool, oneOf, string,object} from 'prop-types';
import sizeClasses from "../../utils/sizeClasses";
import classes from './Dropdown.module.css'
import getClassNames from "../../utils/getClassnames";
const Dropdown = ({position, options, style, className, styles, size}) => {
	let [open, setOpen] = useState(false)
	let [searchValue, setSearchValue] = useState("")
	let [optionsArray, setArrayOptions] = useState(options)
	let [optionsFilterArray, setOptionsFilterArray] = useState(options)
	let [selected, setSelected] = useState(options[0] ? options[0] : null)
	let sizeClassNames = sizeClasses('dropdown',size)
	let openDropdown = () => {
		setOpen(!open)
	}
	
	let selectCode = (index) => {
		if (options[index]) {
			setSelected(optionsFilterArray[index])
			setOpen(false)
		}
	}
	
	let searchHandler = (e) => {
		let value = e?.target?.value?.trim()
		setSearchValue(value)
		let optionsArrayTemp = optionsArray?.filter(v => {
			let optionValue = v?.value
			return optionValue.includes(value)
		})
		setOptionsFilterArray(optionsArrayTemp)
	}
	return (
		<div style={styles}
			 className={getClassNames(classes, 'dropdown dropdown-fluid dropdown-full', sizeClassNames)}>
			<button style={style} onClick={openDropdown} type="button"
					className={`
                   
                    ${getClassNames(classes, 'dropdown-toggle', open ? 'dropdown-open' : '')}
                    ${className}
                    `}
					data-toggle="dropdown">
				{selected?.value}
			</button>
			<div
				className={getClassNames(classes, "dropdown-menu", position === "after" ? 'dropdown-menu-right' : '')}
				style={{minWidth: "110px"}}>
				<input type="text" style={{marginBottom: '5px'}} value={searchValue}
					onChange={searchHandler}/>
				<div className={getClassNames(classes, "dropdown-wrap")}>
					{optionsFilterArray?.map((v, i) => {
						if (v?.toString()?.trim()) {
							let value = v?.value
							return <a onClick={() => {
								selectCode(i)
							}} key={i} className={`${getClassNames(classes, "dropdown-item")}`} href="#">
								{value}
							</a>
						}
					})}
				</div>
			
			</div>
		</div>
	);
};

Dropdown.propTypes = {
	style: object,
	styles: object,
	className: string,
	multiple: bool,
	variants: array,
	name: string.isRequired,
	size: oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
	variant: oneOf(['rounded', 'pill', 'no-radius', 'cover', 'floating', 'outline', 'fill', 'fill-with-border', 'underline', '']),
	disabled: bool,
	value: string,
	placeholder: string,
	defaultValue: string,
	id: string,
};
Dropdown.defaultProps = {
	style: {},
	styles: {},
	className: "",
	multiple: false,
	variants: [],
	name: "",
	size: "md",
	variant: "",
	disabled: false,
	value: "",
	placeholder: "",
	defaultValue: "",
	id: "",
}

export default Dropdown;