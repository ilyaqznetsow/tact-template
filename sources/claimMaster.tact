import "@stdlib/deploy";
import "@stdlib/ownable";
import "./claimChild.tact";

message(0x00000001) Mint {
    user: Address;
    referrer: Address?;
    interval: Int as uint32;
    admin: Address;
}

message(0x0000002) Claim {
    amount: Int as coins;
    boost: Int as coins;
    user: Address;
    referrer: Address?;
}

message(0x0000003) AddReferral {
    from: Address;
    to: Address;
}

message(0x0000004) Referrer {
    user: Address?;
    withClaim: Bool;
}

message(0x0000005) Boost {
    amount: Int as uint32;
}

message(0x00000006) OwnerWithdrawalRequest {
    amount: Int as coins;
    jettonWallet: Address;
}

message(0x00000007) OwnerWithdrawalTonRequest {  
}

message(0x00000008) MasterConfig {
    jettonWallet: Address;
    interval: Int as uint32;
    claimAmount: Int as coins;
    referralReward: Int as coins;
    boostReward: Int as coins;
}

message(0x0000009) CustomMessage {
    to: Address;
    payload: Cell?;
}

message(0x0000010) Referral {
    referral: Address;
    referrer: Address;
}

message(0x0000011) Web3Ban {
    ban: Bool;
    referralsCount: Int as uint32 = 0;
    boost: Int as uint32 = 0;
}

message(0x0000012) ChangeMinter {
    newMinter: Address;
}

message(0x7362d09c) TokenNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    forwardPayload: Slice as remaining;
}

message(0xf8a7ea5) TokenTransfer {
    queryId: Int as uint64; // should be 0
     amount: Int as coins; // should be amount of jettons to send
     destination: Address; // should be user address 
     responseDestination: Address?; // should be myAddress()
     customPayload: Cell?; // should be null
     forwardTonAmount: Int as coins; // should be ton("0.01")
     forwardPayload: Slice?; // should be emptySlice()
}

struct MasterData {
    jettonWallet: Address?;
    interval: Int as uint32;
    minter: Address;
    admin: Address;
    claimAmount: Int;
    referralReward: Int;
    boostReward: Int;
}

contract ClaimMaster with Deployable {
    jettonWallet: Address? = null;
    interval: Int as uint32 = 60 * 60 * 24;
    minter: Address;
    admin: Address;
    claimAmount: Int = 300_000_000;
    referralReward: Int = 150_000_000;
    boostReward: Int = 5_000_000;

    init(minter: Address, admin: Address) 
    {
        self.minter = minter;
        self.admin = admin;
    }

    receive(msg: Mint)
    {
        nativeThrowUnless(101, sender() == self.minter);

        let init: StateInit = initOf ClaimChild(myAddress(), msg.user);
        send(SendParameters
        {
            to: contractAddress(init),
            value: 0,
            mode: SendRemainingValue,
            code: init.code,
            data: init.data,
            body: msg.toCell()
        });
    }

    receive(msg: Claim)
    {
        let expected: Address = self.get_user_address(msg.user);
        nativeThrowUnless(101, sender() == expected);

        send(SendParameters{
            value: ton("0.05"), 
            to: self.jettonWallet!!, 
            mode: 0,
            body: TokenTransfer {
                queryId: 0,
                amount: self.claimAmount + msg.amount * self.referralReward + msg.boost * self.boostReward,
                destination: msg.user,
                responseDestination: myAddress(),
                customPayload: null,
                forwardTonAmount: 1,
                forwardPayload: null
            }.toCell()
        });

        if(msg.referrer != null)
        {
            let refAddress: Address = self.get_user_address(msg.referrer!!);
            send(SendParameters{
                value: 0,
                to: refAddress, 
                mode: SendRemainingValue,
                body: AddReferral { from: msg.user, to: msg.referrer!! }.toCell()
            });
        }
    }

    receive(msg: AddReferral)
    {
        let expected: Address = self.get_user_address(msg.from);
        nativeThrowUnless(101, sender() == expected);

        let refAddress: Address = self.get_user_address(msg.to);
            send(SendParameters{
                value: 0,
                to: refAddress, 
                mode: SendRemainingValue,
                body: msg.toCell()
            });
    }

    receive(msg: MasterConfig)
    {
        let ctx: Context = context();
        nativeThrowUnless(101, ctx.sender == self.minter || ctx.sender == self.admin);

        self.jettonWallet = msg.jettonWallet;
        self.interval = msg.interval;
        self.claimAmount = msg.claimAmount;
        self.referralReward = msg.referralReward;
        self.boostReward = msg.boostReward;
    }

    receive(msg: ChangeMinter)
    {
        nativeThrowUnless(101, sender() == self.admin);

        self.minter = msg.newMinter;
    }

    receive(msg: CustomMessage){
        nativeThrowUnless(101, sender() == self.admin);

        send(SendParameters
        {
            to: msg.to,
            value: 0,
            mode: SendRemainingValue,
            body: msg.payload
        });
    }

    receive(msg: TokenNotification) {        
        nativeThrowUnless(101, sender() == self.jettonWallet);

        let userContract: Address = self.get_user_address(msg.from);
        send(SendParameters
        {
            to: userContract,
            value: 0,
            mode: SendRemainingValue,
            body: Boost {amount: msg.amount / 100_000_000_0}.toCell()
        });
    }

    receive() 
    {
    }

    receive(msg: OwnerWithdrawalTonRequest)
    {
        nativeThrowUnless(1001, sender() == self.admin);

        send(SendParameters{
                to: self.admin,
                value: 0,
                mode: SendRemainingBalance + SendIgnoreErrors
            });
    }

    receive(msg: OwnerWithdrawalRequest)
    {
        nativeThrowUnless(1001, sender() == self.admin);

        if(msg.jettonWallet != null)
        {
            send(SendParameters{
                value: ton("0.065"), 
                to: msg.jettonWallet, 
                mode: 0,
                body: TokenTransfer {
                    queryId: 0,
                    amount: msg.amount,
                    destination: self.admin,
                    responseDestination: self.admin,
                    customPayload: null,
                    forwardTonAmount: 1,
                    forwardPayload: null
                }.toCell()
            });
        }

            send(SendParameters{
                to: self.admin,
                value: 0,
                mode: SendRemainingBalance + SendIgnoreErrors
            });
    }

    get fun get_user_address(user: Address): Address {
        return contractAddress(initOf ClaimChild(myAddress(), user));
    }

    get fun get_master_data(): MasterData {
        return MasterData {
            jettonWallet: self.jettonWallet,
            interval: self.interval,
            minter: self.minter,
            admin: self.admin,
            claimAmount: self.claimAmount,
            referralReward: self.referralReward,
            boostReward: self.boostReward
        };
    }
}
