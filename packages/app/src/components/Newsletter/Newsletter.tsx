import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { theme } from "../../theme";
import { useModal } from "../../hooks";
import { api } from "../../constants";
import { Button, ContentCentered, Title, Text, Spacer } from "../../components";

const Newsletter: React.FC<any> = () => {
	const [email, setEmail] = useState('');

	const initSignUpState = {
		success: undefined,
		title: '',
		message: ''
	};
	const [signUpState, setSignUpState] = useState(initSignUpState);

	// @dev: run `netlify dev --live` to test the function
	const handleSignUp = async () => {
		const lambdaApiEndpoint = api.lambdaApi.endpoint;
		const lambdaApiFunction = api.lambdaApi.functions.subsNewsletter;

		const req = await fetch(`${lambdaApiEndpoint+lambdaApiFunction}?email=${email}`);

		if (req.status === 202) {
			setSignUpState({
				success: true,
				title: 'Sign up succeeded',
				message: 'You are now subscribed to the pepemon newsletter.'
			});
		} else {
			setSignUpState({
				success: false,
				title: 'Sign up failed',
				message: 'Something went wrong. Please try again.'
			});
		}
		// reset input
		setEmail('');
	}

	const [handlePresent, onDismiss] = useModal({
		title: signUpState.title,
		content: <Text align='center' font={theme.font.inter} size='s' color={theme.color.gray[600]}>
					{signUpState.message}
				</Text>,
		modalActions: [
			{
				text: signUpState.success ? 'Great!' : 'I\'ll try again',
				buttonProps: { styling: 'purple', onClick: () => setSignUpState(initSignUpState) },
			}
		]
	})

	useEffect(() => {
		if (signUpState.success !== undefined) {
			handlePresent();
		} else if (signUpState.success) {
			onDismiss();
		}
	}, [signUpState, handlePresent, onDismiss]);

	return (
		<>
			<ContentCentered id="newsletter" style={{paddingTop: "6em", paddingBottom: "6em"}}>
				<Title as="h1" font={theme.font.neometric} size='xxl' weight={900} align="center">
					Stay up to date and claim ‘em all
				</Title>
				<Spacer size="md"/>
				<Text as="p" font={theme.font.spaceMace} align="center" underline>Newsletter</Text>
				<Spacer size="md"/>
				<Text as="p" font={theme.font.inter} lineHeight={1.5} align="center">
					Be the first to collect all the new Pepemons.
				</Text>
				<Spacer size="md"/>
				<ContentCentered direction="row" bgColor={theme.color.white} style={{ borderRadius: "8px", border: `1px solid ${theme.color.purple[600]}`, overflow: 'hidden' }}>
						<StyledInput onChange={(e) => setEmail(e.target.value)} type="email" />
						<Button styling="purple" disabled={email ? false : true} onClick={handleSignUp}>Sign up</Button>
				</ContentCentered>
			</ContentCentered>
		</>
	)
}

const StyledInput = styled.input`
	border: none;
	flex: 1 1 0%;
	font-size: 1.2rem;
	min-width: 0;
	padding: 0.5em;
	&:focus-visible {
		outline: none;
	}
`

export default Newsletter;
