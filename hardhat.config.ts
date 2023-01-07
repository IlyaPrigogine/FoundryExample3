import {task} from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import '@typechain/hardhat';
import {HardhatUserConfig} from 'hardhat/types';
import "@nomiclabs/hardhat-etherscan";
import '@openzeppelin/hardhat-upgrades';

const secret = require("./secret.json");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.13",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 5000
                    }
                }
            },
            {
                version: "0.5.16",
            }
        ],
    },
    namedAccounts: {
        owner: 0,
        user1: 1,
        user2: 2,
        user3: 3,
        user4: 4,
        user5: 5
    },
    networks: {
        goerli: {
            url: secret.url_goerli,
            accounts: [secret.key_dev],
            timeout: 120000
        },
        polygon:{
            url: secret.url_polygon,
            accounts: [secret.key_prd],
            timeout: 120000
        }
    },
    etherscan: {
        // apiKey: secret.api_key_eth
        apiKey: secret.api_key_polygon
    }
}
export default config;

