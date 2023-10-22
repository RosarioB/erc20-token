// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GLDTokenOwner is ERC20Capped, Ownable {
    uint internal constant OWNER_TOKENS = 70_000_000;
    uint internal constant CAP = 100_000_000; 
    uint internal constant TOKEN_SIZE = 10 ** 18;
    string internal constant TOKEN_NAME = "Gold";
    string internal constant TOKEN_TICKER = "GLD";

    constructor() ERC20(TOKEN_NAME, TOKEN_TICKER) ERC20Capped(CAP * TOKEN_SIZE) Ownable(msg.sender){
        _mint(payable(owner()), OWNER_TOKENS * TOKEN_SIZE);
    }

    function mintToken(address account, uint256 amount) public onlyOwner {
        super._mint(account, amount);
    }
}