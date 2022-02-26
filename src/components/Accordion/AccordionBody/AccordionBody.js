import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import classes from "../Accordion.module.css"
import getClassNames from "../../../utils/getClassnames";
const AccordionBody = ({children,open,style,className}) => {
	let ref=useRef()
	let bodyStyle={}
	if (open){
		if (ref?.current){
			bodyStyle['padding']="var(--accordion-padding)"
			bodyStyle['height']=`calc(${ref?.current?.scrollHeight}px + calc(var(--accordion-padding)*2))`
		}
	}else{
		bodyStyle['padding']="0 var(--accordion-padding) 0 var(--accordion-padding)"
		bodyStyle['height']=0
	}
	return (
		<div ref={ref} style={{...style,...bodyStyle}} className={`${getClassNames(classes,'accordion-panel')} ${className}`}>
			<div className={getClassNames(classes,'accordion-body')}>
				{children}
			</div>
		</div>
	);
};

AccordionBody.defaultProps = {
	className:''
};

export default AccordionBody;