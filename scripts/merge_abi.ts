import {deployments, network} from 'hardhat';

const fs = require('fs');

let fullPath: string;
let networkName: string;

async function main() {

    console.log("=== merge abi start at %s ===", new Date().toString());
    networkName = network.name;
    fullPath = "deployments/" + networkName;
    merge_abi();
    export_graph_abi();
    console.log("=== merge abi end at %s ===", new Date().toString());
}

main().then(() => {
    console.log("success");
});


let excludeContracts = [
    "MockDAI",
    "MockMT",
    "SDFactory_Impl",
    "SDIdentifierNFT",
    "SDNFT_VIP_Impl"
]

function merge_abi() {


    fs.readdir(fullPath, function (err: any, files: []) {

        if (err)
            return console.log('Unable to scan directory: ' + err);

        let abi: any = {};
        let addressInfo = "";

        files.forEach(function (file: string) {

            let index = file.indexOf(".json");
            if (index < 0)
                return;

            let data = JSON.parse(fs.readFileSync(fullPath + "/" + file, 'UTF-8'));

            const contractName = file.substring(0, index);
            addressInfo += contractName + ": " + data["address"] + "\n";

            if (excludeContracts.find(e => e == contractName))
                return

            console.log(".. including abi:", contractName);
            if (contractName == "SDAirdrop") {
                abi[contractName] = {
                    "abi": data["abi"]
                }
            } else if (contractName == "MockUSDT") {
                abi["Token"] = {
                    "abi": data["abi"]
                }
            } else {
                abi[contractName] = {
                    "address": data["address"],
                    "abi": data["abi"]
                }
            }

        });

        // add airdrop
        console.log(".. including abi: SDAirdrop");
        let airdrop = JSON.parse(fs.readFileSync("artifacts/contracts/SDAirdrop.sol/SDAirdrop.json", 'UTF-8'));
        abi["SDAirdrop"] = {
            "abi": airdrop["abi"]
        }

        fs.writeFileSync('scripts/abi/deployments-' +
            networkName.replaceAll("_", "-") + "-" + getDate() + '.json', JSON.stringify(abi));

        fs.writeFileSync('scripts/addresses/addresses-' +
            networkName.replaceAll("_", "-") + "-" + getDate() + '.txt', addressInfo);
    });
}

function export_graph_abi() {

    const names = [
        "SDFactory",
        "SDAirdrop",
        "SDIdentifier",
        "Token"
    ];
    const paths = [
        "artifacts/contracts/SDFactory.sol/SDFactory.json",
        "artifacts/contracts/SDAirdrop.sol/SDAirdrop.json",
        "artifacts/contracts/identifier/SDIdentifierNFT.sol/SDIdentifierNFT.json",
        "artifacts/contracts/mock/MockDAI.sol/MockDAI.json"
    ]

    for (let i = 0; i < paths.length; i++) {
        let abi = JSON.parse(fs.readFileSync(paths[i], 'UTF-8'));
        fs.writeFileSync('scripts/graph_abi/' + names[i] + '.json',
            JSON.stringify(abi["abi"]));
    }

}

function getDate() {
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let monthStr = month.toString();
    let dayStr = day.toString();
    if (month >= 1 && month <= 9) {
        monthStr = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        dayStr = "0" + dayStr;
    }
    return monthStr + dayStr;
}
