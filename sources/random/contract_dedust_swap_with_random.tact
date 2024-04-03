import "@stdlib/deploy";

message(0x00000002) OwnerWithdrawalRequest {
    amount: Int as coins;
    tokenAddress: Address?;
}

message(0x00000007) OwnerWithdrawalTonRequest {  
}

message(0x00000004) TokenConfig {
    tokenAddress: Address?;
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

contract CasinoRandom with Deployable {
    owner: Address;
    withdrawal: Address;
    vaultAddress: Address;
    randomSecure: Int as uint64;
    queryId: Int as uint64;
    kingyPoolAddress: Address;
    tokenAddress: Address?;

    init(owner: Address, withdrawalAddress: Address, vaultAddress: Address, kingyPoolAddress: Address, randomSecure: Int) {
        self.owner = owner;
        self.withdrawal = withdrawalAddress;
        self.vaultAddress = vaultAddress;
        self.randomSecure = randomSecure;
        self.queryId = 0;
        self.kingyPoolAddress = kingyPoolAddress;
        self.tokenAddress = null;
    }

    receive(msg: TokenConfig)
    {
        nativeThrowUnless(333, sender() == self.owner);
        self.tokenAddress = msg.tokenAddress;
    }

    receive() {
        let context: Context = context();
        if(context.sender != self.owner)
        {
            nativeThrowUnless(1001, context.value >= ton("1"));
            let fee: Int = ton("0.025");
            nativeRandomizeLt();

            let result: Int = random(0, 100);

            if (result < 100){
                //send jetton

                let reward: Int = abs(context.value / ton("1")) * 1_000_000_000;

                send(SendParameters{
                    value: ton("0.065"), 
                    to: self.tokenAddress!!, 
                    mode: 0,
                    body: TokenTransfer {
                        queryId: self.queryId,
                        amount: reward,
                        destination: sender(),
                        responseDestination: myAddress(),
                        customPayload: null,
                        forwardTonAmount: 1,
                        forwardPayload: null
                    }.toCell()
                });

                fee = fee - ton("0.065");
            }


            let bodyCell: Cell = beginCell()
                .storeUint(0xea06185d, 32)
                .storeUint(0, 64) // query_id:int64
                .storeCoins(context.value - ton("0.25") - fee) // amount:Coins # subtract gas
                // _:SwapStep
                .storeAddress(self.kingyPoolAddress) // pool_addr:MsgAddressInt
                .storeBool(false) // kind:SwapKind
                .storeCoins(0) // limit:Coins
                .storeUint(0, 1) // next:(Maybe ^SwapStep)
                // swap_params:^SwapParams
                .storeRef(
                        beginCell()
                        .storeUint(now() + 60 * 5, 32) // deadline:Timestamp # 5 min
                        .storeAddress(sender()) // recipient_addr:MsgAddressInt
                        .storeAddress(self.owner)
                        .storeUint(0, 2) // reject_payload:(Maybe ^Cell)
                        .endCell()
                    )
                .endCell();

            send(SendParameters{
                value: 0,
                to: self.vaultAddress,
                mode: SendRemainingValue,
                body: bodyCell
            });
        }
    }

    receive(msg: TokenExcesses){

    }

    receive(msg: OwnerWithdrawalTonRequest){
        let context: Context = context();
        nativeThrowUnless(1001, context.value >= ton("0.5"));
        send(SendParameters{
                to: self.withdrawal,
                value: 0,
                mode: SendRemainingBalance
            });
    }

    receive(msg: OwnerWithdrawalRequest) {
        nativeThrowUnless(101, sender() == self.withdrawal);

        if(msg.tokenAddress != null)
        {
            send(SendParameters{
                value: ton("0.065"), 
                to: msg.tokenAddress!!, 
                mode: 0,
                body: TokenTransfer {
                    queryId: self.queryId,
                    amount: msg.amount,
                    destination: sender(),
                    responseDestination: sender(),
                    customPayload: null,
                    forwardTonAmount: 1,
                    forwardPayload: null
                }.toCell()
            });

            self.queryId = self.queryId + 1;
        }

            send(SendParameters{
                to: sender(),
                value: 0,
                mode: SendRemainingBalance
            });
    }

    get fun owner(): Address {
        return self.owner;
    }

    get fun withdrawal(): Address {
        return self.withdrawal;
    }
    
    get fun vaultAddress(): Address? {
        return self.vaultAddress;
    }

    get fun queryId(): Int {
        return self.queryId;
    }

}
