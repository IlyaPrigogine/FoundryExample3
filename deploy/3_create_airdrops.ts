import {DeployFunction} from "hardhat-deploy/types";
import {ethers} from "hardhat";
import {APPROVE_AMOUNT} from "../helpers/constants";
import {parseEther} from "ethers/lib/utils";
import {saveProxyImpl, sleep} from "../helpers/utils";


const func: DeployFunction = async function ({deployments, getNamedAccounts, network, getChainId}) {
    const {execute, get, read} = deployments;
    const {owner} = await getNamedAccounts();

    // console.log(">> Creating airdrops ...");
    // const USDT = await get("MockUSDT");
    // const DAI = await get("MockDAI");
    // await execute("SDFactory", {from: owner}, "createAirdrop", "AirdropUSDT",
    //     "This is a description. This is a description. This is a description. ", USDT.address, ethers.constants.AddressZero);
    // await execute("SDFactory", {from: owner}, "createAirdrop", "AirdropDAI",
    //     "This is a description. This is a description. This is a description. This is a description. This is a description. This is a description.", DAI.address, ethers.constants.AddressZero);
    //
    // await sleep(3000);
    // console.log(">> Depositing USDT ...");
    // const airdropUsdtAddr = await read("SDFactory", "getAirdrop", "AirdropUSDT");
    // const airdropUsdt = await ethers.getContractAt("SDAirdrop", airdropUsdtAddr);
    // await execute("MockUSDT", {from: owner}, "approve", airdropUsdtAddr, APPROVE_AMOUNT);
    // await airdropUsdt.deposit(parseEther("10000"), parseEther("100"));

    // await sleep(3000);
    // console.log(">> Depositing DAI ...");
    // const airdropDaiAddr = await read("SDFactory", "getAirdrop", "AirdropDAI");
    // const airdropDai = await ethers.getContractAt("SDAirdrop", airdropDaiAddr);
    // await execute("MockDAI", {from: owner}, "approve", airdropDaiAddr, APPROVE_AMOUNT);
    // await airdropDai.deposit(parseEther("10000"), parseEther("100.00011"));

    console.log(">> Saving implements ...");
    await saveProxyImpl("SDFactory");
    await saveProxyImpl("SDNFT_VIP");
};
export default func;
func.tags = ["airdrops"];
