import React, { useState, useEffect, useCallback, memo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, MarkerType, Background, Handle } from 'react-flow-renderer';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";



// import required modules
import { Navigation } from "swiper";
import { Box, Switch, Heading, Flex, Text, Grid } from '@chakra-ui/react';

function FFToggleNode() {
    return memo(() => {
        return (
            <>
                <Handle
                    type="target"
                    position="left"
                    isConnectable={false}
                />
                <Switch size='lg' />
                <Handle
                    type="source"
                    position="right"
                    id="a"
                    isConnectable={false}
                />
            </>
        );
    });
}

const nodeTypes = {
    toggleNode: FFToggleNode()
};

const step2ReadNodes = [{
    id: '1',
    type: 'input',
    data: { label: 'App' },
    position: { x: 0, y: 50 },
    style: { borderRadius: 30 },
    sourcePosition: 'right',
},
{
    id: '2',
    type: 'toggleNode',
    style: { padding: 6 },
    position: { x: 200, y: 50 },
},
{
    id: '3',
    type: 'output',
    data: { label: 'MongoDB' },
    position: { x: 450, y: 25 },
    targetPosition: 'left',
},
{
    id: '4',
    type: 'output',
    data: { label: 'DynamoDB' },
    position: { x: 450, y: 100 },
    targetPosition: 'left',
}];

const step2ReadEdges = [{
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: false
},
{
    id: 'e2a-3',
    source: '2',
    target: '3',
    sourceHandle: 'a',
    animated: true,
    markerEnd: {
        type: MarkerType.ArrowClosed,
    },
    label: '100%'
},
{
    id: 'e2a-4',
    source: '2',
    target: '4',
    sourceHandle: 'a',
    animated: false,
    markerEnd: {
        type: MarkerType.ArrowClosed,
    },
    label: '0%'
}];

const CustomNodeFlow = () => {
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]}>
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide style={{ width: '100%', height: '800px' }}>
                    <Box width='100%' height='800px'>
                        <Flex color='#fff' bgColor='brand.title_bg1' height='40px' width='100%' alignItems='center'>
                            <Box textAlign='left' flex='1'><Text marginLeft={2}>Read</Text></Box>
                            <Box textAlign='left' flex='1'><Text>Write</Text></Box>
                        </Flex>
                        <Box width='100%' height='800px'>
                            <Box position='absolute' top='50px' left='25px' textAlign='left'>
                                <Text fontSize='4xl' lineHeight={1} letterSpacing={-1.5}>Early Canary Write</Text>
                                <Text fontSize='large' color='gray.600' lineHeight={1} letterSpacing={-1} marginLeft={0.5} marginTop={2}>db1 is the original database from which you will migrate. db2 is the destination database to which you will migrate your data. It receives data from db1.</Text>
                            </Box>
                            <ReactFlow
                                nodes={step2ReadNodes}
                                edges={step2ReadEdges}
                                nodeTypes={nodeTypes}
                                defaultZoom={0}
                                fitView
                                attributionPosition="bottom-left">
                                <Background />
                                <Controls />
                            </ReactFlow>
                        </Box>
                    </Box>


                </SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </>

    );
};

export default CustomNodeFlow;