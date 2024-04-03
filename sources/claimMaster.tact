import "@stdlib/deploy";
import "@stdlib/ownable";
import "./claimChild.tact";


// () set_code(cell new_code) impure asm "SETCODE";
@name(set_code)
native set_code(newCode: Cell);

message(0x00000001) MintChildWithClaim {
    user: Address;
    referrer: Address?;
}

message(0x000000011) MintChildNoClaim {
    user: Address;
    referrer: Address?;
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
    tokenAddress: Address;
}

message(0x00000007) OwnerWithdrawalTonRequest {  
}

message(0x00000008) TokenConfig {
    tokenAddress: Address;
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

message(0x0000012) Web3Ban {
    ban: Bool;
    referralsCount: Int as uint32 = 0;
    boost: Int as uint32 = 0;
}

message(0x0000013) SetCode {
    newCode: Cell;
}

message(0x7362d09c) TokenNotification {
    queryId: Int as uint64;
    amount: Int as coins;
    from: Address;
    forwardPayload: Slice as remaining;
}

message(0xd53276db) TokenExcesses {
    queryId: Int as uint64;
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

struct ChildState {
    interval: Int as uint32 = 0;
    lastClaimTime: Int as uint64 = 0;
    referralsCount: Int as uint32 = 0;
    boost: Int as uint32 = 0;
}


contract ClaimMaster with Ownable, Deployable {
    queryId: Int as uint64;
    tokenAddress: Address?;
    interval: Int as uint32;
    owner: Address;
    master: Address;
    claimAmount: Int = 3_000_000_00;
    referralReward: Int = 15_000_000_0;
    boostReward: Int = 5_000_000;
    test: Int = 8;

    init(owner: Address, master: Address, interval: Int) 
    {
        self.owner = owner;
        self.queryId = 0;
        self.tokenAddress = null;
        self.interval = interval;
        self.master = master;
    }

    receive(msg: ChangeOwner)
    {
        nativeThrowUnless(101, sender() == self.master);
        self.owner = msg.newOwner;
    }

    receive(msg: CustomMessage){
        nativeThrowUnless(101, sender() == self.master);
        send(SendParameters
        {
            to: msg.to,
            value: 0,
            mode: SendRemainingValue,
            body: msg.payload
        });
    }

    receive(msg: SetCode)
    {
        nativeThrowUnless(101, sender() == self.master);
        set_code(msg.newCode);
    }

    receive(msg: TokenNotification)
    {
        nativeThrowUnless(101, sender() == self.tokenAddress);
        let userContract: Address = self.get_user_address(msg.from);

        send(SendParameters
        {
            to: userContract,
            value: 0,
            mode: SendRemainingValue,
            body: Boost {amount: msg.amount / 100_000_000_0}.toCell()
        });
    }

    receive(msg: MintChildWithClaim)
    {
        nativeThrowUnless(101, sender() == self.owner);
        let init: StateInit = initOf ClaimChild(myAddress(), msg.user, self.owner, self.interval);
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

    receive(msg: MintChildNoClaim)
    {
        nativeThrowUnless(101, sender() == self.owner);
        let init: StateInit = initOf ClaimChild(myAddress(), msg.user, self.owner, self.interval);
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
            to: self.tokenAddress!!, 
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

    receive(msg: TokenConfig)
    {
        let ctx: Context = context();
        nativeThrowUnless(101, ctx.sender == self.owner || ctx.sender == self.master);
        self.tokenAddress = msg.tokenAddress;
        self.claimAmount = msg.claimAmount;
        self.referralReward = msg.referralReward;
        self.boostReward = msg.boostReward;
    }

    receive() 
    {
    }

    receive(msg: TokenExcesses)
    {
    }

    receive(msg: OwnerWithdrawalTonRequest)
    {
        nativeThrowUnless(1001, sender() == self.master);
        send(SendParameters{
                to: self.master,
                value: 0,
                mode: SendRemainingBalance
            });
    }

    receive(msg: OwnerWithdrawalRequest)
    {
        nativeThrowUnless(1001, sender() == self.master);

        if(msg.tokenAddress != null)
        {
            send(SendParameters{
                value: ton("0.065"), 
                to: msg.tokenAddress, 
                mode: 0,
                body: TokenTransfer {
                    queryId: self.queryId,
                    amount: msg.amount,
                    destination: self.master,
                    responseDestination: self.master,
                    customPayload: null,
                    forwardTonAmount: 1,
                    forwardPayload: null
                }.toCell()
            });

            self.queryId = self.queryId + 1;
        }

            send(SendParameters{
                to: self.master,
                value: 0,
                mode: SendRemainingBalance
            });
    }

    get fun interval(): Int {
        return self.interval;
    }

    get fun tokenAddress(): Address? {
        return self.tokenAddress;
    }

    get fun queryId(): Int {
        return self.queryId;
    }

    get fun get_user_address(user: Address): Address {
        return contractAddress(initOf ClaimChild(myAddress(), user, self.owner, self.interval));
    }

    get fun claimAmount(): Int {
        return self.claimAmount;
    }
    get fun referralReward(): Int {
        return self.referralReward;
    }
    get fun boostReward(): Int {
        return self.boostReward;
    }

    get fun test(): Int {
        return self.test;
    }
}
