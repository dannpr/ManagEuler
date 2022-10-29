import { ethers } from "ethers";
import switcher from "../abi/Switcher.json";

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
      '0x820350eac12BcD0AB189ddA2D36989DF20D919E5',
      switcher.abi,
      signer
    );

    return contract;
  } else {
    throw new Error("No Web 3.0 Provider Found!");
  }
};