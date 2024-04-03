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
    tokenAddress: Address?;
    randomSecure: Int as uint64;
    queryId: Int as uint64;
    lastNumber: Int;
    lastWin: Int;
    lastWinner: Address?;

    init(owner: Address, withdrawalAddress: Address, randomSecure: Int) {
        self.owner = owner;
        self.withdrawal = withdrawalAddress;
        self.tokenAddress = null;
        self.randomSecure = randomSecure;
        self.queryId = 0;

        self.lastNumber = 0;
        self.lastWin = 0;
        self.lastWinner = null;
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
            nativeThrowUnless(1001, context.value >= ton("0.3"));

            nativeRandomizeLt();
            let result: Int = random(0,10000);
            let win: Int = 1_000_000_000;
            
            self.lastNumber = result;

            if(result <= 100){
                win = 30_000_000_000;
            } else if (result <= 1000){
                win = 5_000_000_000;
            } else if (result <= 2000){
                win = 2_000_000_000;
            }

            self.lastWin = win;
            self.lastWinner = context.sender;

            send(SendParameters{
                value: ton("0.065"), 
                to: self.tokenAddress!!, 
                mode: 0,
                body: TokenTransfer {
                    queryId: 0,
                    amount: win,
                    destination: context.sender,
                    responseDestination: myAddress(),
                    customPayload: null,
                    forwardTonAmount: 1,
                    forwardPayload: null
                }.toCell()
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
    
    get fun tokenAddress(): Address? {
        return self.tokenAddress;
    }

    get fun queryId(): Int {
        return self.queryId;
    }

    get fun lastWin(): Int {
        return self.lastWin;
    }

    get fun lastNumber(): Int {
        return self.lastNumber;
    }

    get fun lastWinner(): Address? {
        return self.lastWinner;
    }
}
