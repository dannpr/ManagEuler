# ManagEuler

ManagEuler improves the capital efficiency for Euler and other lending protocols through earning yield on unused collateral while maintaining a constant health factor with a keeper.

When you open a position on ManagEuler, the protocol maintains a minimum collateral and buffer health factor on Euler by splitting the value received between collateralization and earning yield. 

There are 4 functions to the smart contract:
- Deposit: open a borrowing position on ManagEuler
- Withdraw: close a position on ManagEuler, receiving all deposited funds as well as the yield generated from Sommelier
- Rebalance: rebalance the health factor of a position by changing the collateral amount (and amount earning yield)
- Manage: change the health factor of your position

Taikai:

Slides:
https://docs.google.com/presentation/d/14F90IfSE_3D3G72VJNmn1twwZTYcsHjR8fXlZs8Z-lM/edit#slide=id.g179bdf89f92_0_30

Pitch video:

Etherscan:



