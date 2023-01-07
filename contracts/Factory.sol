// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "./Airdrop.sol";

contract Factory {
    address[] public airdrops;
    function create(string memory _name, string memory _description, address _token) external returns (address){
        Airdrop ad = new Airdrop();

        ad.initialize(_name, _description,_token,msg.sender);
        airdrops.push(address(ad));

        return address(ad);
    }
}
