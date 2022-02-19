import React from 'react';
import PropTypes, {oneOf, string} from 'prop-types';
import classes from "../Card.module.css"
import getClassNames from "../../../utils/getClassnames";
const CardImage = ({src,alt,layout,className,...rest}) => {
	let layoutArray = ['default', 'rounded', 'no-radius','circle']
	let layoutClasses = ""
	if (layoutArray.includes(layout)) {
		layoutClasses = layout !== 'default' ? `card-image-${layout}` : ''
	}
	return (
		<div className={getClassNames(classes,'card-img-div')}>
			<img {...rest} className={`${getClassNames(classes,layoutClasses)} ${className}`} src={src} alt={alt}/>
		</div>
	);
};

CardImage.propTypes = {
	layout:oneOf(['default','rounded','no-radius','circle']),
	className:string
};

CardImage.defaultProps = {
	layout:'default',
	className:'',
};
export default CardImage;