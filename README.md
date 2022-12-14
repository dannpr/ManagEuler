# ManagEuler

ManagEuler improves the capital efficiency for Euler and other lending protocols through earning yield on unused collateral while maintaining a constant health factor with a keeper.

When you open a position on ManagEuler, the protocol maintains a minimum collateral and buffer health factor on Euler by splitting the value received between collateralization and earning yield.

There are 4 functions to the smart contract:

- Deposit: open a borrowing position on ManagEuler
- Withdraw: close a position on ManagEuler, receiving all deposited funds as well as the yield generated from Sommelier
- Rebalance: rebalance the health factor of a position by changing the collateral amount (and amount earning yield)
- Manage: change the health factor of your position

Taikai:
https://taikai.network/ethlisbon/hackathons/ethlisbon-2022/projects/cl9so13zd54692701zct8qpnz52/idea

Slides:
<https://docs.google.com/presentation/d/14F90IfSE_3D3G72VJNmn1twwZTYcsHjR8fXlZs8Z-lM/edit#slide=id.g179bdf89f92_0_30>

Pitch video:
https://youtu.be/SPprzrcMXTw

Etherscan:
https://goerli.etherscan.io/address/0xcd7BFB25cA728E1251E38A0B1EBfC62389e6e741
