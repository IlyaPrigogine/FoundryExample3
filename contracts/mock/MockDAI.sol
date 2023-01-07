// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockDAI is ERC20 {

    constructor(uint256 _premint) ERC20("DAI", "DAI") {
        _mint(msg.sender, _premint);
    }
}
