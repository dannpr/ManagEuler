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
import { Web3Button, useAccount, useBalance, useToken } from '@web3modal/react';
import tokenList from '../goerli-tokenlist.json'
import { Token } from "../components/Token";

export const Deposit = () => {

  const { account }: any = useAccount();

  const { data, error, isLoading, refetch } = useBalance({
    addressOrName: account.address
  })

  return ( 
      <VStack h={'90vh'} flexGrow={1} w='full' justifyContent={'center'} alignItems={'center'} spacing={3}>
        {
          account.isConnected == false ?
            <>
              <Heading size={'4xl'}>Euler</Heading>
              <Heading>Earn yield on unused collateral</Heading>
            </>
          : <>
              {tokenList.tokens.map((token, index) => (
                <Token token={token} key={index}/>
              ))}
            </>
        }
      </VStack>
  )
}
