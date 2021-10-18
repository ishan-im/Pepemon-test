import React, { useEffect, useState, useContext } from "react";
import BigNumber from "bignumber.js";
import { StyledStoreWrapper, StyledStoreHeader, StyledStoreBody, StyledPepemonCardMeta, StyledPepemonCardPrice } from './index';
import { Button, Title, Text, Spacer, StyledSpacer } from '../../../components';
import { PepemonProviderContext } from '../../../contexts';
import { StoreClaimModal } from '../components';
import { getDisplayBalance } from "../../../utils";
import { ActionClose, cardback_normal, coin } from '../../../assets';
import { useCardsMetadata, useApprove, useAllowance, useTokenBalance, useCardsFactoryData, useCardsStorePrices } from "../../../hooks";
import { theme } from '../../../theme';

const StoreCardsAside: React.FC<any> = ({setSelectedCard, selectedCard: { cardId, cardPrice, cardMetadata = null }}) => {
	const [activeClaimModal, setActiveClaimModal] = useState(false);
	const pepemonContext = useContext(PepemonProviderContext);
	const { chainId, contracts: { pepemonStore, ppdex }, ppdexAddress } = pepemonContext[0];
	const allowance = useAllowance(pepemonStore);

	const isAllowedSpending = () => {
        // No allowance needed for native BNB payments
        if (chainId === 56) {
            return true
        }
        return new BigNumber(100000000000000000000).comparedTo(allowance) === -1;
    }
	console.log(isAllowedSpending());


	if (cardMetadata?.status === "failed") {
		setSelectedCard(null);
		return <></>
	}

	return (
		<StyledStoreWrapper style={{width: "34%"}}>
			<StyledStoreHeader>
				<div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
					<Title as="h2" color={theme.color.white} font={theme.font.neometric} weight={900} size={1.2}>
						Selected Card
					</Title>
					<ActionClose onClick={() => setSelectedCard("")}/>
				</div>
			</StyledStoreHeader>
			<StyledStoreBody>
				<Title as="h2" font={theme.font.neometric} size={1.3}>{cardMetadata ? cardMetadata.name : 'Loading card'}</Title>
				<Spacer size="sm"/>
				<Text as="p" font={theme.font.inter} size={.875} lineHeight={1.3} color={theme.color.gray[600]}>{cardMetadata && cardMetadata.description}</Text>
				<Spacer size="sm"/>
				<img loading="lazy" src={cardMetadata ? cardMetadata.image : cardback_normal} alt={cardMetadata ? cardMetadata.name : 'Loading card'} style={{width: "100%"}}/>
				<Spacer size='md'/>
				<StyledPepemonCardMeta>
					<dt>Rarity:</dt>
					<dd>{cardMetadata && cardMetadata.attributes.find((trait) => trait.trait_type === 'Rarity').value}</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Type:</dt>
					<dd>{cardMetadata && cardMetadata.attributes.find((trait) => trait.trait_type === 'Type').value}</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Set:</dt>
					<dd>{cardMetadata && cardMetadata.attributes.find((trait) => trait.trait_type === 'Set').value}</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Artist:</dt>
					<dd>{cardMetadata && cardMetadata.attributes.find((trait) => trait.trait_type === 'Artist').value}</dd>
				</StyledPepemonCardMeta>
				<Spacer size='sm'/>
				<StyledSpacer bg={theme.color.gray[100]} size={2}/>
				<StyledPepemonCardMeta>
					<dt>Price:</dt>
					<dd>
						<StyledPepemonCardPrice styling="alt">
							<img loading="lazy" src={coin} alt="coin"/>
							{cardPrice}
						</StyledPepemonCardPrice>
					</dd>
				</StyledPepemonCardMeta>
				<Spacer size='md'/>
				<Button styling="purple" onClick={() => setActiveClaimModal(true) } width="100%">Claim card</Button>
				{ activeClaimModal &&
					<StoreClaimModal
						dismiss={() => setActiveClaimModal(false)}
						claimButtonText="Claim card"/>
				}
			</StyledStoreBody>
		</StyledStoreWrapper>
	)
}

export default StoreCardsAside;
