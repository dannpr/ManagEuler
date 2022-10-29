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
import tokenList from '../goerli-tokenlist.json'
import { Token } from "../components/Token";
import { HealthFactorModal } from "../components/HealthFactorModal";
import { WithdrawModal } from "../components/WithdrawModal";
import { useLoaderData } from "react-router-dom";
import { getTokenBalance } from "../services";
import "@fontsource/volkhov";

export const Manage = () => {

  const tokens: any = useLoaderData()

  console.log(tokens)

  return ( 
      <VStack flexGrow={1} w='full' justifyContent={'flex-start'} alignItems={'center'} spacing={3} my={20}>
        <Heading fontSize={'6xl'}  w={'80%'} textAlign={'left'} justifySelf={'flex-start'} fontFamily={'volkhov'}>Your Positions</Heading>
        {
          tokens.map((holding: any, index: number) => (
            <HStack key={index} borderRadius={'lg'} w={'80%'} bgColor={'#102c34'} p={5}>
              <Image src={holding.logoURI} width={'32px'} height={'32px'} />
              <VStack textAlign={'left'} alignItems={'left'} spacing={0}>
                <Text fontSize={'lg'}>{holding.name}</Text> 
                <Text fontSize={'xs'} color={'#a0a0a0'}>{holding.symbol}</Text>
              </VStack>
              <HStack flexGrow={1} justifyContent={'flex-end'} gap={5}>
                <Text color={'#afafaf'}>{holding.balance} {holding.symbol}</Text>
                {/* <HealthFactorModal 
                  // maxBalance={balance.data !== undefined ? ethers.utils.formatUnits(balance.data, token.decimals).substring(0, 5) : '0'} 
                  // tokenAddress={token.address}
                  // account={account?.address}
                /> */}
                <WithdrawModal
                  maxBalance={parseFloat(holding.balance)} 
                  tokenAddress={holding.address}
                />
              </HStack>
            </HStack>
          ))
        }
      </VStack>
  )
}

const TokenManager = ({token, account}: any) => {
    return (
      <HStack borderRadius={'lg'} w={'80%'} bgColor={'#102c34'} p={5}>
        <Image src={token.logoURI} width={'32px'} height={'32px'} />
        <VStack textAlign={'left'} alignItems={'left'} spacing={0}>
          <Text fontSize={'lg'}>{token.name}</Text>
          <Text fontSize={'xs'} color={'#a0a0a0'}>{token.symbol}</Text>
        </VStack>
        <HStack flexGrow={1} justifyContent={'flex-end'}>
          {/* <Text color={'#afafaf'}>{balance.data !== undefined ? ethers.utils.formatUnits(balance.data, token.decimals).substring(0, 5) : '0'}</Text> */}
          {/* <HealthFactorModal 
            // maxBalance={balance.data !== undefined ? ethers.utils.formatUnits(balance.data, token.decimals).substring(0, 5) : '0'} 
            tokenAddress={token.address}
            account={account?.address}
          />
          <WithdrawModal 
            // maxBalance={balance.data !== undefined ? ethers.utils.formatUnits(balance.data, token.decimals).substring(0, 5) : '0'} 
            tokenAddress={token.address}
            account={account?.address}
          /> */}
        </HStack>
      </HStack>
    )
}
