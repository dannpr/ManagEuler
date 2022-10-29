import { Box, Button, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, NumberInput, NumberInputField, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useBreakpointValue, useDisclosure, useFocusEffect, VStack } from '@chakra-ui/react';
import { chains } from '@web3modal/ethereum';
import { useContractRead, useAccount, useContractWrite, useWaitForTransaction } from '@web3modal/react';
import erc20abi from '../abi/erc20.json';
import { ethers } from 'ethers'
import { getSwitcherContract } from '../services';
import { useState, useEffect } from 'react';
import switcher from "../abi/Switcher.json";

export const DepositModal = ({ maxBalance, tokenAddress, account } : any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Overlay = () => (
    <ModalOverlay bg="blackAlpha.700" />
  );

  const modalSize = useBreakpointValue({ base: "xs", sm: "sm", md: "md" });

  const config = {
    address: tokenAddress,
    abi: erc20abi,
    functionName: 'allowance',
    chainId: 5,
    args: [ account, '0x820350eac12BcD0AB189ddA2D36989DF20D919E5' ]
  }
  
  const allowance: any = useContractRead(config)
  
  const isAllowed = allowance.data !== undefined && parseFloat(ethers.utils.formatEther(allowance.data)) > 0;
    
  return (
    <>
      <Button colorScheme='teal' variant='ghost' _hover={{bgColor: 'whiteAlpha.400'}} size={'sm'} onClick={onOpen}>
        Deposit
      </Button>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        size={modalSize}
      >
        <Overlay />
        <ModalContent py="2.5rem" bgColor={'#082129'}>
          <ModalCloseButton />
          <Box>
            <ModalBody textAlign={"center"} px={16} py={12}>
              <DepositForm max={maxBalance} tokenAddress={tokenAddress} account={account} isAllowed={isAllowed}/>
            </ModalBody>
          </Box>
      </ModalContent>
      </Modal>
    </>
  )
}

const DepositForm = ({ max, tokenAddress, account, isAllowed }: any) => {
  
  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  }
  
  const [amount, setAmount] = useState(10);

  const [sliderValue, setSliderValue] = useState(125)

  useEffect(() => {
    console.log((sliderValue/150) * 100)
  }, [sliderValue, amount])

  return (
    <VStack spacing={16}>
      {
        isAllowed ?
        <>
          <Box w={'full'}>
            <Text w={'full'} textAlign={'left'}>Collateral</Text>
            <HStack w='full'>
              <NumberInput value={amount} borderColor={amount > max ? 'red.600' : 'teal.500'}>
                <NumberInputField
                  placeholder={'Max Amount: ' + max}
                  onChange={e => {
                    const result = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
                    setAmount(result);
                  }}
                />
              </NumberInput>
              <Button colorScheme='teal' variant='outline' _hover={{bgColor: 'whiteAlpha.400'}}
                onClick={() => setAmount(parseFloat(max))}
              >
                MAX
              </Button>
            </HStack>
          </Box>
          <Box w={'full'}>
            <Text w={'full'} textAlign={'left'}>Loan</Text>
            <HStack w='full'>
              <NumberInput value={amount} borderColor={amount > max ? 'red.600' : 'teal.500'}>
                <NumberInputField
                  placeholder={'Amount to receive'}
                  onChange={e => {
                    const result = isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value);
                    setAmount(result);
                  }}
                />
              </NumberInput>
              <Text textAlign={'center'} flexGrow={1}>WETH</Text>
            </HStack>
          </Box>
          <Box w={'full'}>
            <Text w={'full'} textAlign={'left'}>Health Factor</Text>
            <HStack w='full' py={2}>
              <Slider aria-label='slider-ex-6' defaultValue={125} colorScheme={'teal'} onChange={(val) => setSliderValue(val)} min={100} max={150}>
                <SliderMark value={100} {...labelStyles}>
                  100%
                </SliderMark>
                <SliderMark value={125} {...labelStyles}>
                  125%
                </SliderMark>
                <SliderMark value={150} {...labelStyles}>
                  150%
                </SliderMark>
                <SliderMark
                  value={sliderValue}
                  borderRadius={'md'}
                  textAlign='center'
                  bg='teal.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  w='12'
                >
                  {sliderValue}%
                </SliderMark>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </HStack>
          </Box>
          <Button
            colorScheme='teal'
            variant='outline'
            _hover={{bgColor: 'whiteAlpha.400'}}
            w={'full'}
            onClick={() => {
              getSwitcherContract()
              .then((contract :any) => {
                console.log(contract)
              })
            }}
            isDisabled={amount > max}
          >
            Deposit & Create Loan
          </Button>
        </>
        : <Button
            colorScheme='teal'
            variant='outline'
            _hover={{bgColor: 'whiteAlpha.400'}}
            w={'full'}
            onClick={() => {
              getSwitcherContract()
              .then(async (contract :any) => {
                try {
                  const tx = await contract.approve();
                  console.log(tx)
                } catch(e) {
                  console.log(e)
                }
              })
            }}
          >
            Approve Contract
          </Button>
    }
    </VStack>
  )
}