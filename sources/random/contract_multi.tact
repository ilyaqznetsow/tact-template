import "@stdlib/deploy";

message(0x00000002) OwnerWithdrawalRequest {
    amount: Int as coins;
    tokenAddress: Address?;
}

message(0x00000007) OwnerWithdrawalTonRequest {  
}

message(0x00000004) TokenConfig {
    tokenAddress2: Address?; //50%
    tokenAddress3: Address?; //3%
    tokenAddress50: Address?; //2%
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
    tokenAddress2: Address?;
    tokenAddress3: Address?;
    tokenAddress50: Address?;
    randomSecure: Int as uint64;
    queryId: Int as uint64;
    lastNumber: Int;
    maxWin: Int?;
    lastWinner: Address?;
    lastWinToken: Address?;

    init(owner: Address, withdrawalAddress: Address, randomSecure: Int) {
        self.owner = owner;
        self.withdrawal = withdrawalAddress;
        self.tokenAddress2 = null;
        self.tokenAddress3 = null;
        self.tokenAddress50 = null;
        self.randomSecure = randomSecure;
        self.queryId = 0;

        self.lastNumber = 0;
        self.maxWin = 1_000_000_000;
        self.lastWinToken = null;
        self.lastWinner = null;
    }

    receive(msg: TokenConfig)
    {
        nativeThrowUnless(333, sender() == self.owner);
        self.tokenAddress2 = msg.tokenAddress2;
        self.tokenAddress3 = msg.tokenAddress3;
        self.tokenAddress50 = msg.tokenAddress50;
    }

    receive() {
        let context: Context = context();
        if(context.sender != self.owner)
        {
            nativeThrowUnless(1001, context.value >= ton("0.3"));

            nativeRandomizeLt();
            let result: Int = random(0,10000);
            let winToken: Address? = null;

            self.lastNumber = result;

            if (result > 5000)
            {
                return;
            }

            if(result <= 200){
                winToken = self.tokenAddress2;
            } else if (result <= 500){
                winToken = self.tokenAddress3;
            } else if (result <= 5000){
                winToken = self.tokenAddress50;
            }

            self.lastWinner = context.sender;
            self.lastWinToken = winToken;

            send(SendParameters{
                value: ton("0.065"),
                to: winToken!!, 
                mode: 0,
                body: TokenTransfer {
                    queryId: 0,
                    amount: self.maxWin!!,
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
    
    get fun tokenAddress50(): Address? {
        return self.tokenAddress50;
    }

    get fun tokenAddress2(): Address? {
        return self.tokenAddress2;
    }

    get fun tokenAddress3(): Address? {
        return self.tokenAddress3;
    }

    get fun queryId(): Int {
        return self.queryId;
    }

    get fun lastNumber(): Int {
        return self.lastNumber;
    }

    get fun lastWinner(): Address? {
        return self.lastWinner;
    }
}
