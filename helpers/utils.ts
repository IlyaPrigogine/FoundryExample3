import {deployments, ethers, upgrades} from "hardhat";

const {save, get} = deployments;

export const deployProxyAndSave = async (contractName: string, args: any[]) => {

    let contractProxy;

    try {
        contractProxy = await get(contractName);
        console.log("reusing Proxy: " + contractName);
    } catch (e) {
        // console.log(e);
        console.log(">> Deploying proxy:", contractName);
        const contractFactory = await ethers.getContractFactory(contractName);
        contractProxy = await upgrades.deployProxy(contractFactory, args, {kind: "uups"},);
        console.log(">> Deployed %s proxy: %s", contractName, contractProxy.address);

        const artifact = await deployments.getExtendedArtifact(contractName);
        await save(contractName, {
            address: contractProxy.address,
            ...artifact
        });
    }
    return contractProxy;

}

export const saveProxyImpl = async (contractName: string) => {

    const contractProxy = await get(contractName);
    const implementation = await upgrades.erc1967.getImplementationAddress(contractProxy.address);
    console.log(">> Saved: %s implementation: %s", contractName, implementation);

    const artifact = await deployments.getExtendedArtifact(contractName);
    await save(contractName + "_Impl", {
        address: implementation,
        ...artifact
    });

    return contractProxy;
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
