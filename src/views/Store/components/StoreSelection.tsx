import React from "react";
import styled from 'styled-components';

const StoreSelectionWrapper: React.FC<any> = ({children}) => {
	return (
		<StyledStoreSelectionWrapper>
			<span>show series</span>
			{children}
		</StyledStoreSelectionWrapper>
	)
}

const StyledStoreSelectionWrapper = styled.div`
	display: flex;
	color: ${props => props.theme.color.purple[400]};
	position: absolute;
	font-family: ${props => props.theme.font.inter};
	top: 1.1em;
	right: 1.1em;
	font-size: .9rem;
	align-items: center;

	> span {
		margin-right: 1.2em;
		font-size: 0.625rem;
	}
`;

export default StoreSelectionWrapper;
