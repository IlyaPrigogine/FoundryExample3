// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./Instance.sol";

contract Factory {
    address[] public instances;
    function create() external {
        Instance ins = new Instance();
        ins.initialize();

        instances.push(address(ins));
    }
}
