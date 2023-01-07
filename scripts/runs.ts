import {deployments, ethers, getNamedAccounts} from 'hardhat';
import {formatEther, parseEther} from "ethers/lib/utils";
import {APPROVE_AMOUNT} from "../helpers/constants";

const {execute, read, get} = deployments;

async function main() {

    const {owner} = await getNamedAccounts();

    // const SDIdentifierNFT = await get("SDIdentifierNFT");
    // await execute("SDFactory", {from: owner}, "setIdentifier", "vip.claim", SDIdentifierNFT.address);

    // let allowance = await read("MockDAI", "allowance", "0x1fD0A4b25D83461fF6963a718aE631C96453DF55", "0x172d9ebb4ebdf93bd2791392db0b5a99eb260388");
    // console.log("allowance:", formatEther(allowance));

    // const USDT = await get("MockUSDT");
    // const DAI = await get("MockDAI");

    // const owner1 = await read("SDFactory", "owner");
    // console.log("owner:", owner1);

    // await execute("SDFactory", {from: owner}, "createAirdrop", "AirdropUSDT", USDT.address, ethers.constants.AddressZero);
    // await execute("SDFactory", {from: owner}, "createAirdrop", "AirdropDAI", DAI.address, ethers.constants.AddressZero);

    // const airdropUsdtAddr = await read("SDFactory", "getAirdrop", "AirdropUSDT");
    // const airdropUsdt = await ethers.getContractAt("SDAirdrop", airdropUsdtAddr);
    //
    // await execute("MockUSDT", {from: owner}, "approve", airdropUsdtAddr, APPROVE_AMOUNT);
    // await airdropUsdt.deposit(parseEther("10000"), parseEther("100"));

    await execute("MockDAI", {from: owner}, "transfer", "0x603666f69a88c21F9D56AB09876e835F5eE59dA5", parseEther("100000"));
    await execute("MockUSDT", {from: owner}, "transfer", "0x603666f69a88c21F9D56AB09876e835F5eE59dA5", parseEther("100000"));
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
