// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/Factory.sol";
import "../contracts/Instance.sol";
import "../contracts/mock/MockDAI.sol";
import "../contracts/mock/MockMT.sol";
import "../contracts/mock/MockUSDT.sol";

contract AirdropTest is Test {
    Factory public factory;
    MockDAI public dai;
    MockMT public mt;
    MockUSDT public usdt;
    Instance public ins;
    event AirdropCreated(address indexed account, address indexed token);

    address public user1;

    function setUp() public {
        factory = new Factory();
        dai = new MockDAI(10000 ether);
        mt = new MockMT(5000 ether);
        usdt = new MockUSDT(5000 ether);

        address temp = factory.create("ins","desc1", address(dai), address(mt));
        ins = Instance(temp);
    }

    function testExample() public {
        assertEq(uint(1),uint(1));

        dai.approve(address(ins), 10000 ether);
        mt.approve(address(ins), 5000 ether);
        ins.deposit(address(dai), 300 ether);
        ins.deposit(address(mt), 100 ether);

        assertEq(ins.balanceA(), 300 ether);
        assertEq(ins.balanceB(), 100 ether);

        ins.deposit(address(dai), 300 ether);
        ins.deposit(address(mt), 100 ether);

        assertEq(ins.balanceA(), 600 ether);
        assertEq(ins.balanceB(), 200 ether);
    }

    function testInstanceSwap() public {
        dai.approve(address(ins), 10000 ether);
        mt.approve(address(ins), 5000 ether);
        ins.deposit(address(dai), 300 ether);
        ins.deposit(address(mt), 100 ether);

        assertEq(ins.balanceA(), 300 ether);
        assertEq(ins.balanceB(), 100 ether);

        ins.swap(3 ether, 1 ether, address(this));

        assertEq(ins.balanceA(), 297 ether);
        assertEq(ins.balanceB(), 99 ether);
    }
}
