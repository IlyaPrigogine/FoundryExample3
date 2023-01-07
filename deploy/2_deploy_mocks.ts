import {DeployFunction} from "hardhat-deploy/types";
import {parseEther} from "ethers/lib/utils";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, execute} = deployments;
    const {owner} = await getNamedAccounts();

    console.log(">> Deploying Mock Tokens ...");

    await deploy("MockDAI", {
        from: owner,
        args: [parseEther("10000000")],
        log: true,
    });

    await deploy("MockUSDT", {
        from: owner,
        args: [parseEther("10000000")],
        log: true,
    });
    
    await deploy("MockMT", {
        from: owner,
        args: [parseEther("10000000")],
        log: true,
    });
    
};
export default func;
func.tags = ["mocks"];
