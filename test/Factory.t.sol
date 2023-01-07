// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/Factory.sol";

contract FactoryTest is Test {
    Factory public factory;
    event AirdropCreated(address indexed account, address indexed token);

    function setUp() public {
        factory = new Factory();
    }

    function testExample() public {
        assertEq(uint(1),uint(1));
    }
}
