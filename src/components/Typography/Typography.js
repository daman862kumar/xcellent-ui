import React, {createElement} from 'react';
import {string} from 'prop-types';

const Typography = ({children, as, style, ...rest}) => {
	let element=as?.toString()?.trim()?.toLowerCase();
	return createElement(element, {
		style: {...style},
		...rest,
		children: children
	})
};

Typography.propTypes = {
	as: string,
};

Typography.defaultProps = {
	as: "p",
};

export default Typography;