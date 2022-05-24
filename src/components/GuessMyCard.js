import { useState, useContext } from 'react';
import { Box, Image, Heading, SimpleGrid, GridItem, Input, Button } from '@chakra-ui/react';
import { DemoContext } from '../App.js';

export default function GuessMyCard() {
    const { context } = useContext(DemoContext);
    const [showCard, setShowCard] = useState(false);

    const buttonClick = () => {
        setShowCard(!showCard);
    }

    const CardImage = () =>
        <Box>
            <Image m='auto' w='50%' src={`https://deckofcardsapi.com/static/img/${context.cardGuess}.png`} />
            <Button w='50%' my={6} size='lg' onClick={buttonClick}>Close</Button>
        </Box>;

    const NameForm = () =>
        <Box
            width='60%'
            textAlign='center'
            m="auto">
            <Heading>Enter your name:</Heading>
            <SimpleGrid>
                <GridItem py={8}>
                    <Input size='lg' placeholder='Enter your name' />
                </GridItem>
                <GridItem>
                    <Button onClick={buttonClick} w="full" size="lg">Submit</Button>
                </GridItem>
            </SimpleGrid>
        </Box>;

    const Game = showCard ? <CardImage /> : <NameForm />;

    return (
        <Box mt={4} w='full' textAlign='center'>
            {Game}
        </Box>
    );
}