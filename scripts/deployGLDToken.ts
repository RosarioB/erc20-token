import { ethers } from "hardhat";
import { GLDToken, GLDToken__factory } from "../typechain-types";

const main = async () : Promise<void> => {
  const CONTRACT_NAME: string = "GLDToken";
  const GldToken: GLDToken__factory = await ethers.getContractFactory("GLDToken");
  console.log("Deploying " + CONTRACT_NAME + "...");
  const gldToken: GLDToken = await GldToken.deploy();
  await gldToken.waitForDeployment();
  console.log(CONTRACT_NAME + ' deployed to: ', await gldToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});