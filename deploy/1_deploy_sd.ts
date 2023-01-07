import {DeployFunction} from "hardhat-deploy/types";
import {deployProxyAndSave} from "../helpers/utils";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {deploy, execute} = deployments;
    const {owner} = await getNamedAccounts();

    console.log(">> Deploying Stardust contracts ...");

    const SDFactory = await deployProxyAndSave("SDFactory", []);

    const SDVIP = await deploy("SDVIP", {
        from: owner,
        args: [50, SDFactory.address],
        log: true,
    });

    const SDNFT_VIP = await deployProxyAndSave("SDNFT_VIP", ["", "", SDFactory.address]);

    const SDIdentifierNFT = await deploy("SDIdentifierNFT", {
        from: owner,
        args: ["Identifier-NFT-VIP", "Hold SD VIP NFT to experience extraordinary functions.", SDNFT_VIP.address],
        log: true,
    });

    console.log(">> Factory setting ...");
    await execute("SDFactory", {from: owner}, "setVip", SDVIP.address);
    await execute("SDFactory", {from: owner}, "setIdentifier", "vip.claim", SDIdentifierNFT.address);

};
export default func;
func.tags = ["sd"];
