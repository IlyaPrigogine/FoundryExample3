// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Instance {
    address public factory;

    address public tokenA;
    address public tokenB;

    string public name;
    string public desc;

    uint public balanceA;
    uint public balanceB;

    constructor () {
        factory = msg.sender;
    }

    function initialize(string memory _name, string memory _desc, address _tokenA, address _tokenB) external {
        require(msg.sender == factory, "only factory");
        name = _name;
        desc = _desc;
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function deposit(address _token, uint _depositAmount) external {
        require ((_token == tokenA) || (_token == tokenB), "only TokenA or TokenB");

        if (_token == tokenA) {
            balanceA += _depositAmount;
        } else if (_token == tokenB) {
            balanceB += _depositAmount;
        }

        SafeERC20.safeTransferFrom(IERC20(_token), msg.sender, address(this), _depositAmount);
    }
}
