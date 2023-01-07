// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Instance {
    address public factory;

    constructor () {
        factory = msg.sender;
    }

    function initialize() external {

    }
}
