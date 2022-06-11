import React from 'react';
import { ContentBox, ContentBoxNumber, ContentColumn, ContentColumns, ExternalLink, Spacer, ButtonLink, Title, Text } from "../../components";
import { theme } from "../../theme";
import { group, pepetrainer } from "../../assets";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Hero: React.FC<any> = ({apy}) => {
	return (
		<ContentColumns mobileStyle={{ marginBottom: '7em' }}>
			<ContentColumn width="40%" style={{paddingTop: "3.75em"}}>
				<Title as="h1" font={theme.font.spaceMace} size='xxxl'>Pepemon! Gotta claim ‘em all!</Title>
				<ContentColumns mobileStyle={{ flexDirection: 'row' }}>
					<ContentColumn
						desktopStyle={{ paddingTop: "3.75em", maxWidth: '65%' }}>
						<Text as="p" font={theme.font.inter} size='l'>
							Digital Collectible Card Games in Metaverse, Owned by the Players. Airdropped 100%. Play2Earn powered by DeFi and NFTs in-game assets.
						</Text>
					</ContentColumn>
					<ContentColumn mobileStyle={{ marginLeft: '1em', flex: '1 0 35%' }} tabletLStyle={{ display: 'none' }}>
						<img src={pepetrainer} alt='pepetrainer' style={{ margin: '0 auto', display: 'block' }}/>
					</ContentColumn>
				</ContentColumns>
				<Spacer size="lg"/>
				<Spacer size="lg"/>
				<ContentColumns width='250%'>
					<ContentColumn width="calc(1/3 * 100%)" space="1.25em">
						<ContentBox shadow style={{height: "auto"}}>
							<ContentBoxNumber><span>1</span></ContentBoxNumber>
							<Text as="p" align="center">
								Own a piece of Pepemon and vote with PPBLZ
							</Text>
							<Spacer size="md"/>
							<ExternalLink href="https://app.uniswap.org/#/swap?outputCurrency=0x4d2ee5dae46c86da2ff521f7657dad98834f97b8" styling='button'>
								Shape the path with other Pepetrainers
							</ExternalLink>
						</ContentBox>
					</ContentColumn>
					<ContentColumn width="calc(1/3 * 100%)" space="1.25em"  style={{transform: "translateY(30%)"}}>
						<ContentBox shadow style={{height: "auto"}}>
							<ContentBoxNumber><span>2</span></ContentBoxNumber>
							<Text as="p" align="center">
								Stake your PPBLZ with
							</Text>
							<Text as="p" size='xl' font={theme.font.neometric} weight={900} align="center">
								{apy && apy}
							</Text>
							<Spacer size="md"/>
							<ButtonLink light="true" to="/staking">Start earning</ButtonLink>
						</ContentBox>
					</ContentColumn>
					<ContentColumn width="calc(1/3 * 100%)" space="1.25em"  style={{transform: "translateY(60%)"}} align="flex-end">
						<ContentBox shadow style={{height: "auto"}}>
							<ContentBoxNumber><span>3</span></ContentBoxNumber>
							<Text as="p" align="center">
								Earn $PPDEX and mint Pepemon Boosterpacks!
							</Text>
							<Spacer size="md"/>
							<ButtonLink light="true" to="/store/boosterpacks">Get your Booster Packs</ButtonLink>
						</ContentBox>
					</ContentColumn>
				</ContentColumns>
			</ContentColumn>
			<ContentColumn width="60%" mobileStyle={{ display: 'none' }} tabletLStyle={{ display: 'block' }}>
				<LazyLoadImage src={group} alt="Pepetrainers" style={{maxWidth: "120%", width: "750px"}} effect="blur" />
			</ContentColumn>
		</ContentColumns>
	)
}

export default Hero;
