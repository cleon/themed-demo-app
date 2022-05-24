import React, { memo, useState, useEffect } from 'react';
import ReactFlow, { MarkerType, Handle, useEdgesState, useNodesState } from 'react-flow-renderer';
import { CodeBlock, monokaiSublime } from 'react-code-blocks';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { Box, Switch, Heading, Flex, useDisclosure, SimpleGrid, ScaleFade, Code } from '@chakra-ui/react';

const FFToggleNode = () => {
    return memo(({ data }) => {
        return (
            <>
                <Handle
                    type="target"
                    position="left"
                    isConnectable={false}
                />
                <Switch colorScheme='gray' spacing={0} size='lg' p={1} onChange={(e) => { if (data?.onToggle) data.onToggle(e.target.checked); }} />
                <Handle
                    type="source"
                    position="right"
                    isConnectable={false}
                />
            </>
        );
    });
}

const nodeTypes = {
    toggleNode: FFToggleNode()
}

const step1Data = {
    get readNodes() {
        return [{
            id: '1',
            type: 'input',
            data: { label: 'App' },
            position: { x: -40, y: 40 },
            style: { borderRadius: 30, background: '#FF3868', color: '#ffffff', border: '0' },
            sourcePosition: 'right'
        }, {
            id: '2',
            type: 'output',
            data: { label: 'Database A' },
            style: { background: '#3F5BFF', color: '#ffffff', border: '0' },
            position: { x: 350, y: 40 },
            targetPosition: 'left'
        }];
    },
    get readEdges() {
        return [{
            id: 'e1',
            source: '1',
            target: '2',
            animated: false,
            markerEnd: {
                type: MarkerType.ArrowClosed,
            },
            labelStyle: { fill: 'white' },
            labelBgStyle: { stroke: '#3F5BFF', fill: '#303131' },
            labelBgPadding: [8, 4],
            label: '100%'
        }];
    },
    get writeNodes() {
        return step1Data.readNodes;
    },
    get writeEdges() {
        return step1Data.readEdges;
    }
}

const step2Data = {
    set toggler(t) { this.toggleHandler = t },
    get readNodes() {
        return [{
            id: '1',
            type: 'input',
            data: { label: 'App' },
            position: { x: -40, y: 40 },
            style: { borderRadius: 30, background: '#FF3868', color: '#ffffff', border: '0' },
            sourcePosition: 'right'
        }, {
            id: '4',
            type: 'toggleNode',
            style: { padding: 0 },
            position: { x: 180, y: 40 }
        }, {
            id: '2',
            type: 'output',
            data: { label: 'Database A' },
            style: { background: '#3F5BFF', color: '#ffffff', border: '0' },
            position: { x: 350, y: 40 },
            targetPosition: 'left'
        }, {
            id: '3',
            type: 'output',
            data: { label: 'Database B' },
            style: { background: '#EBFF38', color: '#000000', border: '0' },
            position: { x: 350, y: 125 },
            targetPosition: 'left'
        }];
    },
    get readEdges() {
        return [{
            id: 'e9',
            source: '1',
            target: '4',
            animated: false,
            markerEnd: {
                type: MarkerType.ArrowClosed
            },
        }, {
            id: 'e8',
            source: '4',
            target: '2',
            animated: false,
            markerEnd: {
                type: MarkerType.ArrowClosed
            },
            labelStyle: { fill: 'white' },
            labelBgStyle: { stroke: '#3F5BFF', fill: '#303131' },
            labelBgPadding: [8, 4],
            label: '100%'
        }, {
            id: 'e10',
            source: '4',
            target: '3',
            animated: false,
            markerEnd: {
                type: MarkerType.ArrowClosed
            },
            labelStyle: { fill: 'white' },
            labelBgStyle: { stroke: '#3F5BFF', fill: '#303131' },
            labelBgPadding: [8, 4],
            label: '0%'
        }];
    },
    get writeNodes() {
        return [{
            id: '5',
            type: 'input',
            data: { label: 'App' },
            position: { x: -40, y: 40 },
            style: { borderRadius: 30, background: '#FF3868', color: '#ffffff', border: '0' },
            sourcePosition: 'right'
        }, {
            id: '6',
            type: 'toggleNode',
            style: { padding: 0 },
            position: { x: 180, y: 40 },
            data: { onToggle: (evt) => this.toggleHandler(evt) }
        }, {
            id: '7',
            type: 'output',
            data: { label: 'Database A' },
            style: { background: '#3F5BFF', color: '#ffffff', border: '0' },
            position: { x: 350, y: 40 },
            targetPosition: 'left'
        }, {
            id: '8',
            type: 'output',
            data: { label: 'Database B' },
            style: { background: '#EBFF38', color: '#000000', border: '0' },
            position: { x: 350, y: 125 },
            targetPosition: 'left'
        }];
    },
    get writeEdges() {
        return [{
            id: 'e11',
            source: '5',
            target: '6',
            animated: false,
            markerEnd: {
                type: MarkerType.ArrowClosed
            }
        }, {
            id: 'e12',
            source: '6',
            target: '7',
            animated: false,
            markerEnd: {
                type: MarkerType.ArrowClosed
            },
            labelStyle: { fill: 'white' },
            labelBgStyle: { stroke: '#3F5BFF', fill: '#303131' },
            labelBgPadding: [8, 4],
            label: '100%'
        }, {
            id: 'e13',
            source: '6',
            target: '8',
            animated: false,
            markerEnd: {
                type: MarkerType.ArrowClosed
            },
            labelStyle: { fill: 'white' },
            labelBgStyle: { stroke: '#3F5BFF', fill: '#303131' },
            labelBgPadding: [8, 4],
            label: '0%'
        }];
    }
}

const CustomNodeFlow = () => {
    const [step1ReadEdges, setStep1ReadEdges] = useEdgesState(step1Data.readEdges);
    const [step1WriteEdges, setStep1WriteEdges] = useEdgesState(step1Data.writeEdges);
    const [step1ReadNodes, setStep1ReadNodes] = useNodesState(step1Data.readNodes);
    const [step1WriteNodes, setStep1WriteNodes] = useNodesState(step1Data.writeNodes);

    const [step2WriteEdges, setStep2WriteEdges, onStep2WriteEdgesChange] = useEdgesState(step2Data.writeEdges);
    const [step2WriteToggleChecked, setStep2WriteToggleChecked] = useState(false);
    const { isOpen, onToggle } = useDisclosure();

    // code examples
    const beforeWriteCodeExample = `// Product Data Access Object
void saveProductData(Product product) {
    DB1Products.createProduct(product);
}`;

    const afterWriteCodeExample = `// Product Data Access Object
void saveProductData(Product product, LDUser user) {
    if (ldClient.boolVariation("products-db1-write", user, true) {
        DB1Products.createProduct(product);
    }
    if (ldClient.boolVariation("products-db2-write", user, true) {
        DB2Products.createProduct(product);
    }
}`;

    const beforeReadCodeExample = `// Product Data Access Object
Product findProductById(int id, LDUser user) {
    return DB1Products.findProduct(id);
}`;

    const afterReadCodeExample = `// Product Data Access Object
Product findProductById(int id, LDUser user) {
    boolean shouldReadDB1 = ldClient.boolVariation("db1-read", user, true);
    boolean shouldReadDB2 = ldclient.boolVariation("db2-read", user, true);

    if (shouldReadDB1 && shouldReadDB2) { // compare results
        Product p1 = DB1Products.findProduct(id);
        Product p2 = DB2Products.findProduct(id);
        
        if(p1 != p2) {
            logger.Error("Product mismatch: db1: %1, db2: %2", p1, p2);
        }
        return p1;
  } else if (shouldReadDB2) { // read from db2 only
        return DB2Products.findProduct(id);
  } else { // read from db1 only
        return DB1Products.findProduct(id);
  }
}`;

    const [beforeCodeBlock1, setBeforeCodeBlock1] = useState(beforeReadCodeExample);

    step2Data.toggler = (checked) => {
        setStep2WriteToggleChecked(checked);
        onToggle(true);
        //((evt) => { onToggle();})()
        //onToggleStep2WriteMessage(true);
    };

    useEffect(() => {
        setStep2WriteEdges((eds) =>
            eds.map((edge) => {
                //console.log(edge.id);
                if (edge.id === 'e13') {
                    edge.label = step2WriteToggleChecked ? '10%' : '0%';
                    edge.animated = step2WriteToggleChecked;
                    edge.style = { ...edge.style, stroke: (step2WriteToggleChecked ? '#B1B1B7' : '#3f4040') };
                }
                return edge;
            })
        );

    }, [step2WriteToggleChecked, setStep2WriteEdges]);

    return (
        <>
            <Swiper navigation={true} modules={[Navigation]}>

                <SwiperSlide>
                    <Box width='100%'>
                        <Flex color='#fff' bg='#282828' height='50px' width='100%'>
                            <Heading fontSize='3xl' lineHeight='50px' fontWeight='medium' letterSpacing='tight' ml={5}>Migration: Preparing your Data Access Object</Heading>
                        </Flex>
                        <Heading bg='#405BFF' color='#fff' pl={8} fontSize='large' lineHeight='30px' fontWeight='medium'>Feature flagging your reads and writes</Heading>
                        <SimpleGrid columns={2} spacing={0}>
                            <Box bgColor='brand.title_bg1' className='code'>
                                <Heading textAlign='center' mt='20px' mb='20px' ml='30px' p={4} width='100px' bg='rgba(255,56,107,.1)' color='#ff386b' as='h4' fontSize='1xl' fontWeight='medium'>BEFORE</Heading>
                                <Code colorScheme='twitter'>test</Code>
                            </Box>
                            <Box bgColor='brand.title_bg2' className='code'>
                                <Heading textAlign='center' mt='20px' mb='20px' ml='30px' p={4} width='100px' bg='rgba(163,78,221,.1)' color='#A14BDD' as='h4' fontSize='1xl' fontWeight='medium'>AFTER</Heading>

                            </Box>
                        </SimpleGrid>
                    </Box>
                </SwiperSlide>

                {/* 
                <SwiperSlide>
                    <Box width='100%'>
                        <Flex color='#fff' bg='#282828' height='50px' width='100%'>
                            <Heading fontSize='3xl' lineHeight='50px' fontWeight='medium' letterSpacing='tight' ml={5}>Migration: Preparing your Data Access Object</Heading>
                        </Flex>
                        <Heading bg='#405BFF' color='#fff' pl={8} fontSize='large' lineHeight='30px' fontWeight='medium'>Feature flagging your reads and writes</Heading>
                        <SimpleGrid columns={2} spacing={0}>
                            <Box bgColor='brand.title_bg1' className='code'>
                                <Heading textAlign='center' mt='20px' mb='20px' ml='30px' p={4} width='100px' bg='rgba(255,56,107,.1)' color='#ff386b' as='h4' fontSize='1xl' fontWeight='medium'>BEFORE</Heading>
                                <CodeBlock language='java' text={beforeReadCodeExample} showLineNumber={true} theme={monokaiSublime} />
                            </Box>
                            <Box bgColor='brand.title_bg2' className='code'>
                                <Heading textAlign='center' mt='20px' mb='20px' ml='30px' p={4} width='100px' bg='rgba(163,78,221,.1)' color='#A14BDD' as='h4' fontSize='1xl' fontWeight='medium'>AFTER</Heading>
                                <CodeBlock language='java' text={afterReadCodeExample} highlight="3-15" showLineNumber={true} theme={monokaiSublime} customStyle={{ background: '#303131' }} />
                            </Box>
                        </SimpleGrid>
                    </Box>
                </SwiperSlide> */}

                <SwiperSlide >
                    <Box width='100%'>
                        <Flex color='#fff' bg='#282828' height='50px' width='100%'>
                            <Heading fontSize='3xl' lineHeight='50px' fontWeight='medium' letterSpacing='tight' ml={5}>Migration: Initial State</Heading>
                        </Flex>
                        <SimpleGrid
                            columns={2}
                            spacing={0}>
                            <Box bgColor='brand.title_bg1'>
                                <Heading textAlign='center' mt='20px' mb='20px' ml='30px' p={4} width='100px' bg='rgba(255,56,107,.1)' color='#ff386b' as='h4' fontSize='1xl' fontWeight='medium'>READ</Heading>
                                <ReactFlow
                                    nodes={step1ReadNodes}
                                    edges={step1ReadEdges}
                                    nodeTypes={nodeTypes}
                                    fitView={true}
                                    minZoom={1.5}
                                    maxZoom={1.5}
                                    style={{ height: '500px' }}>
                                </ReactFlow>
                            </Box>
                            <Box bgColor='brand.title_bg2'>
                                <Heading textAlign='center' mt='20px' mb='20px' ml='30px' p={4} width='100px' bg='rgba(163,78,221,.1)' color='#A14BDD' as='h4' fontSize='1xl' fontWeight='medium'>WRITE</Heading>
                                <ReactFlow
                                    nodes={step1WriteNodes}
                                    edges={step1WriteEdges}
                                    nodeTypes={nodeTypes}
                                    fitView={true}
                                    minZoom={1.5}
                                    maxZoom={1.5}
                                    style={{ height: '500px' }}>
                                </ReactFlow>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </SwiperSlide>

                <SwiperSlide >
                    <Box width='100%'>
                        <Flex color='#fff' bg='#282828' height='50px' width='100%'>
                            <Heading fontSize='3xl' lineHeight='50px' fontWeight='medium' letterSpacing='tight' ml={5}>Migration: Early Canary Write</Heading>
                        </Flex>
                        <SimpleGrid
                            columns={2}
                            spacing={0}>
                            <Box bgColor='brand.title_bg1'>
                                <Heading textAlign='center' mt='20px' mb='20px' ml='30px' p={4} width='100px' bg='rgba(255,56,107,.1)' color='#ff386b' as='h4' fontSize='1xl' fontWeight='medium'>READ</Heading>
                                <ReactFlow
                                    nodes={step2Data.readNodes}
                                    edges={step2Data.readEdges}
                                    nodeTypes={nodeTypes}
                                    fitView={true}
                                    minZoom={1.5}
                                    maxZoom={1.5}
                                    style={{ height: '500px' }}>
                                </ReactFlow>
                            </Box>
                            <Box bgColor='brand.title_bg2'>
                                <Heading textAlign='center' mt='20px' mb='20px' ml='30px' p={4} width='100px' bg='rgba(163,78,221,.1)' color='#A14BDD' as='h4' fontSize='1xl' fontWeight='medium'>WRITE</Heading>
                                <ReactFlow
                                    nodes={step2Data.writeNodes}
                                    edges={step2WriteEdges}
                                    nodeTypes={nodeTypes}
                                    fitView={true}
                                    minZoom={1.5}
                                    maxZoom={1.5}
                                    onEdgesChange={onStep2WriteEdgesChange}
                                    style={{ height: '500px' }}>
                                    <ScaleFade initialScale={0.9} in={isOpen}>
                                        <Heading position='absolute' fontSize='medium' top='300' left='120' bg='#212121' color='#BCBEC0' padding='15px 10px' w={310} >100% of traffic sent to database A<br />10% traffic duplicated in database B to assess performance</Heading>
                                    </ScaleFade>
                                </ReactFlow>
                            </Box>
                        </SimpleGrid>
                    </Box>
                </SwiperSlide>

            </Swiper>
        </>

    );
};

export default CustomNodeFlow;