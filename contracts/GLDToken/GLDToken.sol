// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    address payable public owner;
    uint internal  constant TOKEN_SUPPLY = 70000000;
    uint internal constant TOKEN_SIZE = 10 ** 18;
    string internal constant TOKEN_NAME = "Gold";
    string internal constant TOKEN_TICKER = "GLD";

    constructor() ERC20(TOKEN_NAME, TOKEN_TICKER) { 
        owner = payable(msg.sender); 
        _mint(owner, TOKEN_SUPPLY * TOKEN_SIZE);
    }
}