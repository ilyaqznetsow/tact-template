import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { ClaimMaster } from "./output/GM_ClaimMaster";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { randomInt } from "crypto";

(async () => {
    // Parameters
    let testnet = true;
    let packageName = "GM_ClaimMaster.pkg";
    let owner = Address.parse("0QBi8I_It4oENAaQOS-XSj2JYRJgUUhFvr_daAdkwpo9AAn8");
    let master = Address.parse("0QCJ81a9ELPIYJGHxavNe7HVhAx_iojnPev_jmT_2PEgEO7T");;

    let init = await ClaimMaster.init(master, master, BigInt(60*3));

    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    // console.log(init.code.toBoc().toString('base64'));
    // return;
    let pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

    // Prepareing
    console.log("Uploading package...");
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log("Contract Address");
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log("Please, follow deployment link");
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();
