import { expect } from "chai";
import { ethers } from "hardhat";
import { formatEther } from "ethers";
import { GLDToken, GLDToken__factory } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("GLDToken contract", () => {
    let Token: GLDToken__factory;
    let gldToken: GLDToken;
    let owner: HardhatEthersSigner;
    let addr1: HardhatEthersSigner;
    let addr2: HardhatEthersSigner;
    const TOKEN_CAP: number = 100_000_000;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("GLDToken");
        [owner, addr1, addr2] = await ethers.getSigners();
        gldToken = await Token.deploy();
    });

    describe("Deployment", () => {
        it("Should set the right owner", async () => {
          expect(await gldToken.owner()).to.equal(owner.address);
        });
    
        it("Should assign the total supply of tokens to the owner", async function () {
          const ownerBalance = await gldToken.balanceOf(owner.address);
          expect(await gldToken.totalSupply()).to.equal(ownerBalance);
        });
    
        it("Should set the max capped supply to the argument provided during deployment", async function () {
          const cap = await gldToken.cap();
          expect(Number(formatEther(cap))).to.equal(TOKEN_CAP);
        });
    
      });

      describe("Transactions", () => {
        it("Should transfer tokens between accounts", async () => {
          await gldToken.transfer(addr1.address, 50);
          const addr1Balance = await gldToken.balanceOf(addr1.address);
          expect(addr1Balance).to.equal(50);
    
          await gldToken.connect(addr1).transfer(addr2.address, 50);
          const addr2Balance = await gldToken.balanceOf(addr2.address);
          expect(addr2Balance).to.equal(50);
        });
    
        it("Should fail if sender doesn't have enough tokens", async function () {
          const initialOwnerBalance = await gldToken.balanceOf(owner.address);
          await expect(
            gldToken.connect(addr1).transfer(owner.address, 1)
          ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    
          expect(await gldToken.balanceOf(owner.address)).to.equal(
            initialOwnerBalance
          );
        });
    
        it("Should update balances after transfers", async function () {
          const initialOwnerBalance: bigint = await gldToken.balanceOf(owner.address);
          await gldToken.transfer(addr1.address, 100);
          await gldToken.transfer(addr2.address, 50);
    
          const finalOwnerBalance = await gldToken.balanceOf(owner.address);
          expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150n);
    
          const addr1Balance = await gldToken.balanceOf(addr1.address);
          expect(addr1Balance).to.equal(100);
    
          const addr2Balance = await gldToken.balanceOf(addr2.address);
          expect(addr2Balance).to.equal(50);
        });
      });

      describe("Minting new tokens", () => {
        it("Should mint new tokens", async () => {
          await gldToken.mint(addr1.address, 25_000);
          const addr1Balance = await gldToken.balanceOf(addr1.address);
          expect(addr1Balance).to.equal(50);
    
          await gldToken.connect(addr1).transfer(addr2.address, 50);
          const addr2Balance = await gldToken.balanceOf(addr2.address);
          expect(addr2Balance).to.equal(50);
        });
      }
});