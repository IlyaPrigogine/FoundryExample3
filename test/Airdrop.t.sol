// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/Factory.sol";
import "../contracts/Airdrop.sol";
import "../contracts/mock/MockDAI.sol";

contract AirdropTest is Test {
    Factory public factory;
    MockDAI public dai;
    Airdrop public airdrop;
    event AirdropCreated(address indexed account, address indexed token);

    address public user1;

    function setUp() public {
        factory = new Factory();
        dai = new MockDAI(10000 ether);
        address temp = factory.create("airdrop1","description1",address(dai));
        airdrop = Airdrop(temp);

        user1 = address(1);
    }

    function testExample() public {
        dai.approve(address(airdrop), 1000 ether);
        airdrop.deposit(1000 ether, 100 ether);

        assertEq(dai.balanceOf(address(airdrop)),1000 ether);
        assertEq(dai.balanceOf(address(this)),9000 ether);

        airdrop.claim();
        assertEq(dai.balanceOf(address(airdrop)),900 ether);
        assertEq(dai.balanceOf(address(this)),9100 ether);

        airdrop.withdraw(user1,500 ether);
        assertEq(dai.balanceOf(address(airdrop)),400 ether);
        assertEq(dai.balanceOf(address(this)),9100 ether);
        assertEq(dai.balanceOf(user1),500 ether);
    }
    function testAirdropDeposit() public {
        dai.approve(address(airdrop), 1000 ether);
        airdrop.deposit(1000 ether, 100 ether);

        assertEq(airdrop.balance(), 1000 ether);
        assertEq(airdrop.claimAmount(),100 ether);
        assertEq(dai.balanceOf(address(airdrop)), 1000 ether);
        assertEq(dai.balanceOf(address(this)),9000 ether);
    }
    function testAirdropClaim() public {
        dai.approve(address(airdrop), 1000 ether);
        airdrop.deposit(1000 ether, 100 ether);
        airdrop.claim();

        assertEq(airdrop.balance(),900 ether);
        assertEq(airdrop.claimAmount(),100 ether);
        assertEq(dai.balanceOf(address(airdrop)), 900 ether);
        assertEq(dai.balanceOf(address(this)),9100 ether);
    }
    function testAirdropWithdraw() public {
        dai.approve(address(airdrop), 1000 ether);
        airdrop.deposit(1000 ether, 100 ether);
        airdrop.claim();
        airdrop.withdraw(user1,500 ether);

        assertEq(airdrop.balance(),400 ether);
        assertEq(airdrop.claimAmount(),100 ether);
    }
    function testAirdropParameters() public {
        dai.approve(address(airdrop), 1000 ether);
        airdrop.deposit(1000 ether, 100 ether);

        assertEq(airdrop.factory(),address(factory));
        assertEq(airdrop.name(),"airdrop1");
        assertEq(airdrop.description(),"description1");
        assertEq(airdrop.token(),address(dai));
        assertEq(airdrop.owner(),address(this));
        assertEq(airdrop.balance(),1000 ether);
        assertEq(airdrop.claimAmount(),100 ether);
    }

    function testAirdropClaimed() public {
        dai.approve(address(airdrop), 1000 ether);
        airdrop.deposit(1000 ether, 100 ether);

        assertEq(airdrop.claimed(address(this)),false);
        airdrop.claim();
        assertEq(airdrop.claimed(address(this)),true);
    }
}
