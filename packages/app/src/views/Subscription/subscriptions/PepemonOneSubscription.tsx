import React, { useState, useContext, useEffect } from 'react'
import BigNumber from 'bignumber.js';
import { AccordionWrapper, AccordionHeader, AccordionHeaderTitle, AccordionHeaderButton, AccordionBody, AccordionBodyContent, Spacer, Button, Title, Text, ContentColumns, ContentColumn, ExternalLink } from "../../../components";
import { PepemonProviderContext } from "../../../contexts";
import { getCardMeta, useTokenBalance, useApprove, useAllowance, useLotteryMinLPTokens, useLotteryRewardCard, useLotteryLPBalance, useLotteryIsStaking, useLotteryHasClaimed, useLotteryStakingDeadline, useLotteryStakingStartblock, useLotteryClaim, useLotteryWithdraw, useLotteryStake, useBlock } from '../../../hooks';
import { getPepemonLotteryContract, getPpdexAddress, getPpdexUniV2Contract, getUniV2PpdexAddress } from '../../../pepemon/utils';
import { getBalanceNumber } from '../../../utils';
import { cardback_normal, dropdownarrow, pokeball, uparrow } from "../../../assets";
import { theme } from "../../../theme";

const PepemonOneSubscription: React.FC<any> = () => {
	const pepemonContext = useContext(PepemonProviderContext);
	const pepemon = pepemonContext[0];

    const ppdexUniV2Balance = useTokenBalance(getUniV2PpdexAddress(pepemon));
    const [transaction, setTransaction] = useState(0);
    const { onApprove, isApproving } = useApprove(getPepemonLotteryContract(pepemon), getPpdexUniV2Contract(pepemon));
    const { onLotteryStake, isJoining } = useLotteryStake();
    const { onLotteryWithdraw, isWithdrawing } = useLotteryWithdraw();
    const { onLotteryClaim, isClaiming } = useLotteryClaim();
    const blockNumber = useBlock();
    const lockedPeriod = 208000;
    const allowance = useAllowance(getPepemonLotteryContract(pepemon), getPpdexUniV2Contract(pepemon));
    const minLPTokens: BigNumber = useLotteryMinLPTokens();
    const isStaking = useLotteryIsStaking(transaction);
    const stakedBalance = useLotteryLPBalance(transaction);
    const rewardCard = useLotteryRewardCard();
	const [cardMeta, setCardMeta] = useState(null)
	useEffect(() => {(async () => {
			setCardMeta(await getCardMeta(parseInt(rewardCard || 0 ), pepemon))
		})()
	}, [rewardCard, pepemon]);
    const stakingDeadline = useLotteryStakingDeadline();
    const stakingStart = useLotteryStakingStartblock(transaction);
    const hasClaimed = useLotteryHasClaimed(rewardCard, transaction);
    const lockedBlocks = (parseInt(stakingStart) + lockedPeriod) - blockNumber;
    const canClaimCurrentCard = () => {
        return stakingDeadline > stakingStart;
    }

	const [openAccordion, setOpenAccordion] = useState(true);
	const toggleAccordion = () => {
		console.log(openAccordion);
		setOpenAccordion(!openAccordion)
	}

	return (
		<AccordionWrapper isOpen={openAccordion}>
			<AccordionHeader onClick={toggleAccordion} isOpen={openAccordion}>
				<AccordionHeaderTitle>
					<img loading="lazy" src={pokeball} alt="Pokeball" style={{ width: "40px", height: "40px", marginRight: "1em" }}/>
					<Title as="h2" color={openAccordion ? theme.color.green[200] : theme.color.white} weight={900} font={theme.font.neometric}>Pepemon One Subscription</Title>
				</AccordionHeaderTitle>
				<AccordionHeaderButton onClick={toggleAccordion}>
						<span>Show {openAccordion ? "less" : "more"}</span>
						<img loading="lazy" src={openAccordion ? uparrow : dropdownarrow} alt="logo" style={{ height: "0.5em", alignSelf: "center", }}/>
				</AccordionHeaderButton>
			</AccordionHeader>
			{openAccordion &&
				<AccordionBody>
					<AccordionBodyContent side="left">
						<Text as="p" size={.875} lineHeight={1.125}>
							Get Exclusive NFTs! Provide 100 PPDEX (+ETH) on Uniswap LP, stake these LP tokens and recieve a unique NFT every month. Your LP tokens will be locked for a minimum 32 days.
						</Text>
						<Spacer size="lg"/>
						<ContentColumns>
							<ContentColumn width="50%">
								<Text as="p" lineHeight={1}>PPDEX-ETH LP balance</Text>
								<Spacer size="sm"/>
								<Text as="p" size={2.5} weight={900} lineHeight={1} font={theme.font.neometric}>
									{parseFloat(getBalanceNumber(ppdexUniV2Balance).toString()).toFixed(2)}
								</Text>
								<Spacer size="md"/>
								<Text as="p" lineHeight={1}>PPDEX-ETH LP staked</Text>
								<Spacer size="sm"/>
								<Text as="p" size={2.5} weight={900} lineHeight={1} font={theme.font.neometric}>
									{parseFloat(getBalanceNumber(stakedBalance).toString()).toFixed(2)}
								</Text>
							</ContentColumn>
							<ContentColumn width="50%">
								<ExternalLink href={`https://app.uniswap.org/#/add/v2/ETH/${getPpdexAddress(pepemon)}`}>Buy PPDEX-ETH LP</ExternalLink>
							</ContentColumn>
						</ContentColumns>
						<Spacer size="md"/>
						{ isStaking &&
							<>
								<Text as="p" size={2.5} lineHeight={1.1} color={theme.color.purple[600]} weight={900} font={theme.font.neometric}>
									You have an active <wbr/>subscription!
								</Text>
								<Spacer size="md"/>
							</>
						}
							<div style={{ display: "inline-flex", flexDirection: "column" }}>
								<Text as="p" size={.875}>
									{ minLPTokens ?
										`${parseFloat(parseFloat((getBalanceNumber(minLPTokens) + 0.01).toString()).toPrecision(3))} PPBLZ-ETH LP needed to subscribe` :
										'loading...'
									}
								</Text>
								<Spacer size="sm"/>
								{allowance.comparedTo(minLPTokens) === -1 ?
									<Button disabled={isApproving} size="sm" styling="purple" onClick={onApprove}>
										{isApproving ? 'Approving...' : 'Approve LP'}
									</Button>
								: isStaking ?
									<Button disabled={isWithdrawing || (lockedBlocks > 0)} size="sm" styling="purple" onClick={() => onLotteryWithdraw().then(() => setTransaction(transaction + 1))}>
										{(lockedBlocks > 0) ? 'Locked' : isWithdrawing ? 'Unsubscribing...' : 'Unsubscribe'}
									</Button>
								:
									<Button disabled={(minLPTokens && ppdexUniV2Balance.comparedTo(minLPTokens) === -1) || isJoining || isStaking} size="sm" styling="purple" onClick={() => onLotteryStake().then(() => setTransaction(transaction + 1))}>
										{isStaking ? 'Active' : (minLPTokens && ppdexUniV2Balance.comparedTo(minLPTokens) === -1) ? 'Insufficient LP' : isJoining ? 'Staking...' : 'Subscribe & Stake LP'}
									</Button>
								}
							</div>
						<Spacer size="md"/>
					</AccordionBodyContent>

					<AccordionBodyContent side="right">
						<div>
							<Text as="p" size={.75} color={theme.color.gray[400]} txtTransform="uppercase">This months card:</Text>
							<Spacer size="md"/>
							<Text as="p" size={1.375} color={theme.color.headers} weight={900} font={theme.font.neometric}>{cardMeta ? cardMeta.name : 'Loading card title...'}</Text>
							<Spacer size="sm"/>
							<Text as="p" size={.875} color={theme.color.headers}>
								{cardMeta ? cardMeta.description : 'Loading card description...'}
							</Text>
							<Spacer size="sm"/>
							<img src={cardMeta ? cardMeta.image : cardback_normal} alt={cardMeta ? cardMeta.name : 'Loading card...'}/>
							<Spacer size="md"/>
							{ isStaking ?
								<>
									{ canClaimCurrentCard() ?
										<Button disabled={hasClaimed || isClaiming} styling="purple" width="100%" onClick={() => onLotteryClaim().then(() => setTransaction(transaction + 1))}>
											{hasClaimed ? 'Already claimed' : (isClaiming ? 'Claiming...' : 'Claim card')}
										</Button>
										:
										<Button disabled styling="white_borderless" width="100%">
											Not eligible
										</Button>
									}
								</>
								:
								<Button disabled styling="white_borderless" width="100%">
									Subscribe to claim
								</Button>
							}
						</div>
					</AccordionBodyContent>
				</AccordionBody>
			}
		</AccordionWrapper>
	)
}

export default PepemonOneSubscription;
