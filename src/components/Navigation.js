import { useContext, useEffect, useState } from 'react'
import { DemoContext } from '../App.js';
import {
	Box,
	Flex,
	HStack,
	Link,
	IconButton,
	useDisclosure,
	Stack,
	Text,
	Image, Center, Modal, ModalBody, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton,
	Button
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import SettingsDrawer from './Drawer.js';
import Broken from './Broken.js';
import DFM from './DFM.js';

export default function Navigation() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { context } = useContext(DemoContext);
	const [showUIBroken, setShowUIBroken] = useState(false);
	const [showStubHubForm, setShowStubHubForm] = useState(false);
	const hasNavLinks = (context.navLinks?.length > 0);

	useEffect(() => {
		if (!context.demoBroken && showUIBroken) {
			setShowUIBroken(false);
		}
	}, [context.demoBroken]);

	function firstLinkClicked() {
		setShowStubHubForm(true);
	}

	function continueButtonClickec() {
		if (context.demoBroken) {
			setShowStubHubForm(false);
		}
		setShowUIBroken(context.demoBroken);
	}

	const ServerBroken = () => {
		return context.demoServerBroken ? <div><Broken server='true' /></div> : null;
	}

	const UIBroken = () => {
		return showUIBroken ? <div><Broken /></div> : null;
	}

	const DownForMaintenance = () => {
		return context.downForMaintenance == "Show Now" ? <DFM /> : null;
	};

	const ModalStubHubForm = () => {
		const modal = <Modal size='xs' isOpen={showStubHubForm} onClose={closeStubHubForm} isCentered={true}>
			<ModalOverlay bg='blackAlpha.800' />
			<ModalContent>
				<ModalHeader bg='brand.header_bg1'>
					<Center>
						<Image src='stubhub.png' height='4rem' width='9.75rem' className='ldLogoImage' />
					</Center>
					<ModalCloseButton />
				</ModalHeader>
				<ModalBody>
					<Stack>
						<Text fontSize='xl' fontWeight='bold' color='#677382'>Claim your offer now:</Text>
						<Text fontFamily='Inconsolata' fontSize='3xl' textAlign='center'>5B0L7T</Text>
						<Text color='gray' fontSize='small'>
							Listing: 67983433<br />
							Offer Exp: 05/31/2027<br />
							Token: LD21467752
						</Text>
					</Stack>
					<Center marginTop={6}>
						<Button color='#ffffff' backgroundColor='#3F1E75' borderRadius={20} width='100%' onClick={continueButtonClickec}>Continue</Button>
					</Center>
				</ModalBody>
			</ModalContent>
		</Modal>;
		return showStubHubForm ? modal : null;
	};

	function closeStubHubForm() {
		setShowStubHubForm(false);
	}

	const NavLinksWithBrokenLink = () => {
		return hasNavLinks ?
			context.navLinks.map((link, index) =>
				<Link {...(index === 0 && { onClick: firstLinkClicked })}
					key={link} px={2} py={1} rounded='md' _hover={{ textDecoration: 'none' }} href='#'>{link}
				</Link>)
			: null;
	}

	const CloseMenuButton = () => {
		return hasNavLinks ?
			<IconButton
				border='2px' borderColor='gray.300'
				size={'md'}
				icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
				display={{ md: 'none' }}
				onClick={isOpen ? onClose : onOpen} />
			: null;
	}

	return (
		<Box px={2} w='full' textAlign='center' justifyContent='center'>
			<ServerBroken />
			<ModalStubHubForm />
			<UIBroken />
			<DownForMaintenance />
			<Flex h={20} alignItems='center' justifyContent='space-between' marginTop={1} marginBottom={1}>
				<CloseMenuButton />
				<Flex>
					<Image marginLeft='8px' src='ld_logo_dark.png' height='1.5rem' width='9.75rem' className='ldLogoImage' />
				</Flex>
				<HStack spacing={3} alignItems='center' display='flex'>
					<HStack
						as='nav'
						spacing={1}
						display={{ base: 'none', md: 'flex' }}>
						<NavLinksWithBrokenLink />
					</HStack>

					<SettingsDrawer />

					<Image
						htmlHeight={74}
						htmlWidth={58}
						src={context.avatar} />
				</HStack>
			</Flex>

			{isOpen &&
				<Box pb={4} display={{ md: 'none' }}>
					<Stack as={'nav'} spacing={4}>
						<NavLinksWithBrokenLink />
					</Stack>
				</Box>
			}
		</Box>
	)
}
