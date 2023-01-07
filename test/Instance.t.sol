// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/Factory.sol";
import "../contracts/Instance.sol";
import "../contracts/mock/MockDAI.sol";

contract AirdropTest is Test {
    Factory public factory;
    MockDAI public dai;
    Instance public airdrop;
    event AirdropCreated(address indexed account, address indexed token);

    address public user1;

    function setUp() public {
        factory = new Factory();
        dai = new MockDAI(10000 ether);
    }

    function testExample() public {
        assertEq(uint(1),uint(1));
    }
}
