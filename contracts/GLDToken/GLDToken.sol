// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract GLDToken is ERC20Capped {
    address payable public owner;
    uint internal constant OWNER_TOKENS = 70_000_000;
    uint internal constant CAP = 100_000_000; 
    uint internal constant TOKEN_SIZE = 10 ** 18;
    string internal constant TOKEN_NAME = "Gold";
    string internal constant TOKEN_TICKER = "GLD";

    constructor() ERC20(TOKEN_NAME, TOKEN_TICKER) ERC20Capped(CAP * TOKEN_SIZE){
        owner = payable(msg.sender);
        _mint(owner, OWNER_TOKENS * TOKEN_SIZE);
    }

    function mint(address account, uint256 amount) public onlyOwner() {
        super._mint(account, amount);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
}