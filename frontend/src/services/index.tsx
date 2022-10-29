import { ethers } from "ethers";
import switcher from "../abi/Switcher.json";
import erc20abi from "../abi/erc20.json";
import { EulerManager } from "./constants";

interface MetaMaskWindow extends Window {
  ethereum: any;
}

declare var window: MetaMaskWindow;

const requestAccount = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
};

export const getSigner = async () => {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  }
};

export const getAddress = async () => {
  try {
    const signer: any = await getSigner();
    const address = await signer.getAddress();
    return address;
  } catch (error) {
    return error;
  }
}

export const getENSName = async () => {
  try {
    const address = await getAddress()
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const ensName = await provider.lookupAddress(address);
    const resolver = ensName ? await provider.getResolver(ensName) : null;
    const avatar = resolver ? await resolver.getAvatar() : null;
    return {name: ensName == null ? address : ensName, avatar};
  } catch (error) {
    return error;
  }
}

export const getTokenData = async (tokenAddress: string) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, erc20abi, provider);
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();
    const name = await contract.name();
    return {decimals, symbol, name};
  } catch (error) {
    return error;
  }
}

export const getTokenBalance: any = async (tokenAddress: string) => {
  try {
    const address = await getAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, erc20abi, provider);
    const balance = await contract.balanceOf(address);
    const shortenedBalance = balance !== undefined ? ethers.utils.formatUnits(balance, await contract.decimals()).substring(0, 5) : '0'
    return shortenedBalance;
  } catch (error) {
    console.log(error);
  }
}

export const getSwitcherContract = async () => {
  if (typeof window.ethereum !== "undefined") {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      EulerManager,
      switcher.abi,
      signer
    );

    return contract;
  } else {
    throw new Error("No Web 3.0 Provider Found!");
  }
};

export const getTokenContract = async (tokenAddress: string) => {
  if (typeof window.ethereum !== "undefined") {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      tokenAddress,
      erc20abi,
      signer
    );

    return contract;
  } else {
    throw new Error("No Web 3.0 Provider Found!");
  }
};