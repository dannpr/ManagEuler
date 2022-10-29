import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ErrorElement = () => (
	<Flex w={'100vw'} h={'100vh'} gap={'5'} bgImage={'/blue.png'} bgSize={'cover'} bgPosition={'center'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
		<Heading>That's an error.</Heading>
        <Link to={'/'}><Text fontSize={'2xl'}>Back to Home <ExternalLinkIcon/></Text></Link>
	</Flex>
)

export default ErrorElement;