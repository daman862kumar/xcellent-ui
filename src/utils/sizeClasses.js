let sizeClasses = (prefix,size) => {
	let sizes = {
		xs: 'extra-small',
		sm: 'small',
		lg: 'large',
		xl: 'extra-large',
	}
	return size !== "md" ? `${prefix}-${sizes[size]}` : ''
}

export default sizeClasses
