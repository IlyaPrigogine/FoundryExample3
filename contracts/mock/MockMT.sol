// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockMT is ERC20 {

    constructor(uint256 _premint) ERC20("MT", "MT") {
        _mint(msg.sender, _premint);
    }
}
