import { useContractWrite, useSigner, useWaitForTransaction } from '@web3modal/react';
import { chains } from '@web3modal/ethereum';
import switcher from "../abi/Switcher.json";
import { ethers } from 'ethers'

export const useWriter = async () => {
    // const signer = useSigner()
    const config = {
        address: '0xD6893edD79593CC730dd1963E715B08623Cf4FdE',
        abi:  switcher.abi,
        functionName: 'deposit',
        chainId: 5,
        args: [ '1000000', ethers.utils.parseUnits('800000000000000000') ],
        // signer: signer.data
        
    }
    const { data, error, isLoading, write } = useContractWrite(config)

    write()
    const { receipt, isWaiting } = useWaitForTransaction({ hash: data?.hash })
    console.log(error)
}

