import { ethers } from "ethers";
import switcher from "../abi/Switcher.json";
import erc20abi from "../abi/erc20.json";

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

export const getSwitcherContract = async () => {
  if (typeof window.ethereum !== "undefined") {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      '0x0685e582246fe00373B20370eC0705DC8eE39729',
      switcher.abi,
      signer
    );

    return contract;
  } else {
    throw new Error("No Web 3.0 Provider Found!");
  }
};

export const getUSDCContract = async () => {
  if (typeof window.ethereum !== "undefined") {
    const signer = await getSigner();
    const contract = new ethers.Contract(
      '0x693FaeC006aeBCAE7849141a2ea60c6dd8097E25',
      erc20abi,
      signer
    );

    return contract;
  } else {
    throw new Error("No Web 3.0 Provider Found!");
  }
};