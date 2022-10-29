// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IEulerEToken, IEulerMarkets, EulerAddrGoerli, IEulerDToken } from "./interfaces/IEuler.sol";
// import { Cellar } from "cellar-contracts/src/base/Cellar.sol";

contract Switcher {
    
    address public collateralToken = address(0x693FaeC006aeBCAE7849141a2ea60c6dd8097E25);

    address public EULER_MAINNET = address(0x931172BB95549d0f29e10ae2D079ABA3C63318B3); //Euler Goerli Mainnet

    address public borrowedToken = address(0xa3401DFdBd584E918f59fD1C3a558467E373DacC); //WETH

    IEulerMarkets markets = IEulerMarkets(0x3EbC39b84B1F856fAFE9803A9e1Eae7Da016Da36);

    IEulerEToken eToken = IEulerEToken(markets.underlyingToEToken(collateralToken));

    IEulerDToken borrowedDToken = IEulerDToken(markets.underlyingToDToken(borrowedToken));

    address payable public owner;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public healthRatios;

    event Withdrawal(uint256 amount, uint256 when);
    event Deposit(uint256 amount, uint256 when);
    event VerifySettings(address token, uint256 healthRatio);
    event Adjustment(address _beneficiary, address _owner, uint256 _amount);
    event Management(address _beneficiary, address _owner, uint256 _healthRatio);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function approve() public {

        // Approve our contract
        ERC20(collateralToken).approve(
            address(this),
            type(uint).max
        );
    }

    function deposit(uint256 amount, uint256 healthRatio) public payable {

        // Transfer collateral into our smart contract
        ERC20(collateralToken).transferFrom(
            msg.sender,
            address(this),
            amount
        );

        // Approve Euler Goerli contract to spend USDC
        IERC20(collateralToken).approve(
            0x931172BB95549d0f29e10ae2D079ABA3C63318B3,
            type(uint).max
        );

        // Add the deposited tokens into existing balance 
        balances[msg.sender] += amount;

        healthRatios[msg.sender] = healthRatio;

        // Deposit 1-healthRatio into sommelier
        // Cellar().deposit((1-healthRatio*amount)/100, msg.sender);
        // Missing Goerli Sommelier address


        // Interact with Euler to deposit the tokens
        eToken.deposit(0, (healthRatio*amount)/100);

        // Enter Euler market to receiver eUSDC
        markets.enterMarket(0, 0x693FaeC006aeBCAE7849141a2ea60c6dd8097E25);

        // borrowedDToken.borrow(0, 1e5); 
        // Error I get is "e/insufficient-tokens-available"
    }

    // function manage(uint256 newHealthRatio) public {

    //     // get the current health ratio
    //     uint256 currentHealthRatio = healthRatios[msg.sender];

    //     // get the current balance
    //     uint256 currentBalance = balances[msg.sender];

    //     // if the new health ratio is greater than the current health ratio
    //     if (newHealthRatio > currentHealthRatio) {

    //         // get the amount of tokens to be deposited or withdrawn
    //         uint256 amount = (newHealthRatio - currentHealthRatio) * currentBalance;

    //         // withdraw tokens from sommelier 


    //         // deposit the amount of tokens into euler
    //         eToken.deposit(0, amount);
    //         // borrow the amount of tokens

    //         borrowedDToken.borrow(0, amount);

    //     } else {

    //         // get the amount of tokens to be deposited or withdrawn
    //         uint256 amount = (currentHealthRatio - newHealthRatio) * currentBalance;
            
    //         // approve & repay the amount of tokens
    //         IERC20(borrowedToken).approve(EULER_MAINNET, type(uint).max);
    //         borrowedDToken.repay(0, amount);

    //         // withdraw the amount of tokens
    //         eToken.withdraw(0, amount);

    //         // supply back into sommelier

    //     }

    //     // update the health ratio
    //     healthRatios[msg.sender] = newHealthRatio;

    //     emit Management(msg.sender, owner, newHealthRatio);

    // }

    function adjustment() public {

    }

    function withdraw(uint256 amountToWithdraw) public {

        emit Withdrawal(address(this).balance, block.timestamp);

        IERC20(borrowedToken).approve(EULER_MAINNET, type(uint).max);
        borrowedDToken.repay(0, type(uint).max);

        eToken.withdraw(0, amountToWithdraw);
    }
}
