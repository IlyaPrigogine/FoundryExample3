import {deployments, ethers, upgrades} from 'hardhat';

const {get} = deployments;

async function main() {

    const ContractName = "SDFactory";
    const ContractFactory = await ethers.getContractFactory(ContractName);
    const Contract = await get(ContractName);
    await upgrades.upgradeProxy(Contract.address, ContractFactory);
    
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
