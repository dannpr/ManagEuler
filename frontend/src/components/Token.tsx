import { Button, HStack, Image, Input, Text, useDisclosure, VStack } from '@chakra-ui/react';
import erc20abi from '../abi/erc20.json';
import { ethers } from 'ethers'
import { DepositModal } from './DepositModal';
import { getAddress } from '../services';
import { useLoaderData } from 'react-router-dom';

export const Token = ({token, balance} : any) => {

  const account = getAddress()

  return (
    <HStack borderRadius={'lg'} w={'80%'} bgColor={'#102c34'} p={5}>
      <Image src={token.logoURI} width={'32px'} height={'32px'} />
      <VStack textAlign={'left'} alignItems={'left'} spacing={0}>
        <Text fontSize={'lg'}>{token.name}</Text>
        <Text fontSize={'xs'} color={'#a0a0a0'}>{token.symbol}</Text>
      </VStack>
      <HStack flexGrow={1} justifyContent={'flex-end'} spacing={5}>
        <Text color={'#afafaf'}>{balance}</Text>
        <DepositModal 
          maxBalance={balance} 
          token={token}
          account={account}
        />
      </HStack>
    </HStack>
  )
}