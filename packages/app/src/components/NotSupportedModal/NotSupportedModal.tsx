import React, { useState } from 'react';
import { UnhandledError, Modal, ModalTitle, ModalContent, ModalActions, Spacer, Text } from '../../components';
import { theme } from '../../theme';
import { useSwitchNetwork} from 'wagmi'


const NotSupportedModal: React.FC<{page: string}> = ({ page }) => {
	const [unhandledError, setUnhandledError] = useState({errCode: null, errMsg: ''})
	const {switchNetwork} = useSwitchNetwork()

	const handleSwitch = async () => {
		try {
			if(typeof switchNetwork === 'function'){
					
				await switchNetwork(1)   
	   
				}
		} catch (error: any) {
		  setUnhandledError({
			errCode: error.code,
			errMsg: error.message,
		  });
		}
	  };
	  

    return (<>{ unhandledError.errCode ?
		<UnhandledError
			errCode={unhandledError?.errCode}
			errMsg={unhandledError?.errMsg}
			onDismiss={() => setUnhandledError({errCode: null, errMsg: ''})}/>
		:
        <Modal>
            <ModalTitle text='Not (yet) supported' />
            <ModalContent>
				<Text align='center' font={theme.font.inter} size='s' color={theme.color.gray[600]}>
                	{`Your chosen network is currently not supported on the ${page} page.`}
					<br/>
					Please change your wallet provider's network to ETH.
				</Text>
            </ModalContent>
			<Spacer size='md'/>
            <ModalActions modalActions={[
				{
					text: 'Switch to ETH',
					buttonProps: { styling: 'purple', onClick: handleSwitch }
				}
			]}/>
        </Modal>
    }</>)
}

export default NotSupportedModal
