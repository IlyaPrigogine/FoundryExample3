// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDT is ERC20 {

    constructor(uint256 _premint) ERC20("USDT", "USDT") {
        _mint(msg.sender, _premint);
    }
}
