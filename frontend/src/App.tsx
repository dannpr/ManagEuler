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
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { Web3Button, useAccount, useBalance, useToken, useContract } from '@web3modal/react';
import tokenList from './goerli-tokenlist.json'
import { Token } from "./components/Token";
import { Deposit } from "./pages/Deposit";
import switcher from "./abi/Switcher.json";

export const App = () => {

  const { account }: any = useAccount();

  const { data, error, isLoading, refetch } = useBalance({
    addressOrName: account.address
  })

  const { contract, isReady } = useContract({
    address: '0xD6893edD79593CC730dd1963E715B08623Cf4FdE',
    abi: switcher.abi
  })

  // useWriter()

  return ( 
    <Box textAlign="center" fontSize="xl">
      <Flex w='full'  alignItems={'center'} px={20} py={5} gap={5}>
        <Image src={'/logo.png'} width={'64px'} height={'33.5px'}/>
        <HStack flexGrow={1} justifyContent={'flex-end'}>
          {
            account.isConnected && (
              <>
                <Text>{data?.formatted.substring(0, 5) + ' ETH'}</Text>
                <Text>{account.address.substring(0, 5) + '...' + account.address.substring(account.address.length -3, account.address.length)}</Text>
              </>
            )
          }
          <Web3Button/>
        </HStack>
      </Flex>
      <Deposit/>
    </Box>
  )
}
