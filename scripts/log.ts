import {deployments, ethers} from 'hardhat';

const {execute, read, get, save} = deployments;

async function main() {

    const factoryDeployed = await get("SDFactory");
    const factory = await ethers.getContractAt("SDFactory", factoryDeployed.address);

    // const hash = "0xf6947d69bfb442462945ec91104cb8654314e4206435ba9c2abb5deb43bdca0a";
    const hash = "0x9757534674749e55947828a4144dd8f57b2b9cc48a8f9f974452dd154fa09e38";
    let receipt = await ethers.provider.getTransactionReceipt(hash);

    let event;
    try {
        event = factory.interface.parseLog(receipt.logs[0]);
    } catch (e) {
        try {
            event = factory.interface.parseLog(receipt.logs[1]);
        } catch (e) {
            event = factory.interface.parseLog(receipt.logs[2]);
        }
    }
    
    console.log("event:", event);
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
