import { ethers } from "hardhat";
import { GLDTokenOwner, GLDTokenOwner__factory } from "../typechain-types";

const main = async () : Promise<void> => {
  const CONTRACT_NAME: string = "GLDTokenOwner";
  const GldTokenOwner: GLDTokenOwner__factory = await ethers.getContractFactory("GLDTokenOwner");
  console.log("Deploying " + CONTRACT_NAME + "...");
  const gldToken: GLDTokenOwner = await GldTokenOwner.deploy();
  await gldToken.waitForDeployment();
  console.log(CONTRACT_NAME + ' deployed to: ', await gldToken.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});