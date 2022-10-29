import React, { useEffect } from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  Heading,
  Button,
  HStack,
  Image,
} from "@chakra-ui/react"
import { Token } from "../components/Token";
import { useLoaderData } from "react-router-dom";

export const Deposit = () => {

  const { tokens, balances }: any = useLoaderData()

  return ( 
      <VStack flexGrow={1} w='full' justifyContent={'flex-start'} alignItems={'center'} spacing={3} my={20}>
        <Heading fontSize={'6xl'}  w={'80%'} textAlign={'left'} justifySelf={'flex-start'} fontFamily={'volkhov'}>All Assets</Heading>

        {tokens.map((token: any, index: number) => (
          <Token token={token} key={index} balance={balances[index]}/>
        ))}
      </VStack>
  )
}
