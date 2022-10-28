// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IEulerEToken,IEulerMarkets,EulerAddrGoerli} from "./interfaces/IEuler.sol";

contract Switcher {
    address public token = address(0x362a26a19466b3B9962e223A0733E21dfF79166E);

    address payable public owner;
    address payable public beneficiary;
    IEulerMarkets markets = IEulerMarkets(EulerAddrGoerli.markets);
    IEulerEToken eToken = IEulerEToken(markets.underlyingToEToken(token));

    mapping(address => uint256) public balances;


    event Withdrawal(uint256 amount, uint256 when);
    event Deposit(uint256 amount, uint256 when);
    event Adjustment(address _beneficiary, address _owner, uint256 _amount);
    event Management(address _beneficiary, address _owner, uint256 _amount);

    constructor(address payable _beneficiary) payable {
        owner = payable(msg.sender);
        beneficiary = _beneficiary;
        
    }

    function deposit(uint256 tokens) public payable {
        require(msg.sender == owner, "You aren't the owner");
        // USDC contract address
        ERC20(0x362a26a19466b3B9962e223A0733E21dfF79166E).approve(
            msg.sender,
            tokens
        );

        //approve euler goerli contract to spend USDC
        IERC20(0x362a26a19466b3B9962e223A0733E21dfF79166E).approve(0x931172BB95549d0f29e10ae2D079ABA3C63318B3, type(uint).max);

        // add the deposited tokens into existing balance 
        balances[msg.sender]+= tokens;
        // split in two the money
        uint256 halft = tokens / 2;

        //interact with euler protocol to deposit the tokens
        eToken.deposit(0,halft);

    }
/* 
    function adjustment() public {
        require(msg.sender == owner, "You aren't the owner");
    }

    function manage(address payable _beneficiary) public {
        require(msg.sender == owner, "You aren't the owner");
        beneficiary = _beneficiary;
    }

    function withdraw() public {
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        beneficiary.transfer(address(this).balance);
    }  */
}
