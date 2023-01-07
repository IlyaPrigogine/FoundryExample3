// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/Factory.sol";
import "../contracts/Instance.sol";
import "../contracts/mock/MockDAI.sol";
import "../contracts/mock/MockMT.sol";

contract AirdropTest is Test {
    Factory public factory;
    MockDAI public dai;
    MockMT public mt;
    Instance public ins;
    event AirdropCreated(address indexed account, address indexed token);

    address public user1;

    function setUp() public {
        factory = new Factory();
        dai = new MockDAI(10000 ether);
        mt = new MockMT(5000 ether);

        address temp = factory.create("ins","desc1", address(dai), address(mt));
        ins = Instance(temp);
    }

    function testExample() public {
        assertEq(uint(1),uint(1));
    }
}
