// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract  Airdrop {
    address public factory;
    string public name;
    string public description;
    address public token;
    address public owner;

    uint public balance;
    uint public claimAmount;

    mapping(address => bool) public claimed;

    modifier onlyAirdropOwner {
        require (msg.sender == owner, "only Owner");
        _;
    }

    constructor () {
        factory = msg.sender;
    }

    function initialize(string memory _name, string memory _description, address _token, address _owner) external {
        require(msg.sender == factory, "only factory");
        name = _name;
        description = _description;
        token = _token;
        owner = _owner;
    }

    function deposit(uint _depositAmount, uint _claimAmount) external onlyAirdropOwner {
        SafeERC20.safeTransferFrom(IERC20(token),msg.sender, address(this), _depositAmount);
        balance += _depositAmount;
        claimAmount = _claimAmount;
    }

    function withdraw(address _to, uint _amount) external onlyAirdropOwner {
        require( _amount > 0, "withdraw >0 ");
        balance -= _amount;
        SafeERC20.safeTransfer(IERC20(token),_to,_amount);
    }

    function claim() external {
        require(!claimed[msg.sender], "claimed");

        claimed[msg.sender] = true;
        balance -= claimAmount;
        SafeERC20.safeTransfer(IERC20(token), msg.sender, claimAmount);
    }
}
