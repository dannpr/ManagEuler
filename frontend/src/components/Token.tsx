import { Button, HStack, Image, Input, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { chains } from '@web3modal/ethereum';
import { useContractRead, useAccount } from '@web3modal/react';
import erc20abi from '../abi/erc20.json';
import { ethers } from 'ethers'
import { DepositModal } from './DepositModal';

export const Token = ({token} : any) => {

  const address: any = token.mainnetAddress
  const { account }: any = useAccount();
  const config = {
    address,
    abi: erc20abi,
    functionName: 'balanceOf',
    chainId: 5,
    args: [ account?.address ]
  }
  const balance: any = useContractRead(config)
  // console.log(data)
  return (
    <HStack borderRadius={'lg'} w={'80%'} bgColor={'#102c34'} p={5}>
      <Image src={token.logoURI} width={'32px'} height={'32px'} />
      <VStack textAlign={'left'} alignItems={'left'} spacing={0}>
        <Text fontSize={'lg'}>{token.name}</Text>
        <Text fontSize={'xs'} color={'#a0a0a0'}>{token.symbol}</Text>
      </VStack>
      <HStack flexGrow={1} justifyContent={'flex-end'}>
        <Text color={'#afafaf'}>{balance.data !== undefined ? ethers.utils.formatUnits(balance.data, token.decimals).substring(0, 5) : '0'}</Text>
        <DepositModal 
          maxBalance={balance.data !== undefined ? ethers.utils.formatUnits(balance.data, token.decimals).substring(0, 5) : '0'} 
          tokenAddress={address}
          account={account?.address}
        />
      </HStack>
    </HStack>
  )
}