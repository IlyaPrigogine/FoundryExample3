// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./Instance.sol";

contract Factory {
    address[] public instances;
    mapping (address => mapping(address => bool)) public pairs;

    function create(string memory _name, string memory _desc, address _tokenA, address _tokenB) external {
        require(pairs[_tokenA][_tokenB] == false, "duplicate");
        require(pairs[_tokenB][_tokenA] == false, "duplicate");

        Instance ins = new Instance();
        ins.initialize(_name, _desc, _tokenA, _tokenB);

        pairs[_tokenA][_tokenB] = true;
        pairs[_tokenB][_tokenA] = true;
        instances.push(address(ins));
    }
}
