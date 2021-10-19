import React from "react";
import styled from "styled-components";
import { AnimatedImg } from "../../components";
import {
	// downgreenarrow,
	pepertle, warpertle, rektoise } from "../../assets";

const Evolve = () => {
	return (
		<div style={{ position: "relative", height: "100%", width: "250%", display: "grid", gridAutoRows: "1fr"}}>
			<div>
				<div style={{width: "28%"}}>
					<AnimatedImg src={pepertle} alt="pepertle" />
				</div>
			</div>
			<div style={{width: "100%", margin: "0 auto", transform: "translateY(-30%)"}}>
				{/*<img loading="lazy" src={downgreenarrow} alt="downgreenarrow" style={{position: "relative", left: "40%", transform: "translateX(-50%) translateY(60%)"}}/>*/}
				<DashedContainer style={{left: "50%", transform: "translateX(-50%)"}}>
					<AnimatedImg src={warpertle} alt="warpertle" />
				</DashedContainer>
			</div>
			<div style={{width: "100%", margin: "0 0 0 auto", transform: "translateY(-60%)"}}>
				<DashedContainer style={{ right: "0"}}>
					<AnimatedImg src={rektoise} alt="rektoise" />
				</DashedContainer>
			</div>
		</div>
	)
}

const DashedContainer = styled.div`
	// border: 1px dashed gray;
	// border-radius: 8px;
	height: 100%;
	position: absolute;
	width: 28%;
`

export default Evolve;
