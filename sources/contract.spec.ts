import { toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { ClaimMaster } from "./output/sample_ClaimMaster";
import { randomInt } from "crypto";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(
            await ClaimMaster.fromInit(owner.address, BigInt(60 * 60 * 24), BigInt(randomInt(100000)))
        );
        system.name(contract.address, "main");
        let track = system.track(contract);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 0,
                "events": [
                  {
                    "$type": "deploy",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "type": "known",
                        "value": {
                          "$$type": "Deploy",
                          "queryId": 0n,
                        },
                      },
                      "bounce": true,
                      "from": "@treasure(owner)",
                      "to": "@main",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 10174n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "DeployOk",
                            "queryId": 0n,
                          },
                        },
                        "bounce": false,
                        "from": "@main",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "0.98863",
                      },
                    ],
                  },
                ],
              },
            ]
        `);

        // Check counter
        expect(await contract.getOwner()).toEqual(owner);

        // // Increment counter
        // await contract.send(owner, { value: toNano(1) }, "increment");
        // await system.run();
        // expect(track.collect()).toMatchInlineSnapshot(`
        //     [
        //       {
        //         "$seq": 1,
        //         "events": [
        //           {
        //             "$type": "received",
        //             "message": {
        //               "body": {
        //                 "text": "increment",
        //                 "type": "text",
        //               },
        //               "bounce": true,
        //               "from": "@treasure(owner)",
        //               "to": "@main",
        //               "type": "internal",
        //               "value": "1",
        //             },
        //           },
        //           {
        //             "$type": "processed",
        //             "gasUsed": 8176n,
        //           },
        //           {
        //             "$type": "sent",
        //             "messages": [
        //               {
        //                 "body": {
        //                   "text": "incremented",
        //                   "type": "text",
        //                 },
        //                 "bounce": true,
        //                 "from": "@main",
        //                 "to": "@treasure(owner)",
        //                 "type": "internal",
        //                 "value": "0.990604",
        //               },
        //             ],
        //           },
        //         ],
        //       },
        //     ]
        // `);

        // // Check counter
        // expect(await contract.getCounter()).toEqual(1n);

        // // Non-owner
        // await contract.send(nonOwner, { value: toNano(1) }, "increment");
        // await system.run();
        // expect(track.collect()).toMatchInlineSnapshot(`
        //     [
        //       {
        //         "$seq": 2,
        //         "events": [
        //           {
        //             "$type": "received",
        //             "message": {
        //               "body": {
        //                 "text": "increment",
        //                 "type": "text",
        //               },
        //               "bounce": true,
        //               "from": "@treasure(non-owner)",
        //               "to": "@main",
        //               "type": "internal",
        //               "value": "1",
        //             },
        //           },
        //           {
        //             "$type": "failed",
        //             "errorCode": 4429,
        //             "errorMessage": "Invalid sender",
        //           },
        //           {
        //             "$type": "sent-bounced",
        //             "message": {
        //               "body": {
        //                 "cell": "x{FFFFFFFF00000000696E6372656D656E74}",
        //                 "type": "cell",
        //               },
        //               "bounce": false,
        //               "from": "@main",
        //               "to": "@treasure(non-owner)",
        //               "type": "internal",
        //               "value": "0.995112",
        //             },
        //           },
        //         ],
        //       },
        //     ]
        // `);
    });
});
