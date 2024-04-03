
contract ClaimChild with Ownable {
    owner: Address;
    parent: Address;
    master: Address;
    interval: Int as uint32;
    lastClaimTime: Int as uint64 = 0;
    referralsCount: Int as uint32 = 0;
    referrer: Address? = null;
    boost: Int as uint32 = 0;
    ban: Bool = false;

    init(parent: Address, user: Address, master: Address, interval: Int) {
        self.parent = parent;
        self.owner = user;
        self.master = master;
        self.interval = interval;
    }

    receive(msg: MintChildNoClaim)
    {
        nativeThrowUnless(666, sender() == self.parent);
        
        self.referrer = msg.referrer;

        if (self.referrer == null)
        {
            send(SendParameters
            {
                to: self.parent,
                value: 0,
                mode: SendRemainingValue
            });

            return;
        }

        let referrerAddress: Address = contractAddress(initOf ClaimChild(self.parent, self.referrer!!, self.master, self.interval));

        send(SendParameters
        {
            to: referrerAddress,
            body: AddReferral { from: self.owner, to: self.referrer!!}.toCell(),
            value: 0,
            mode: SendRemainingValue
        });
    }

    receive(msg: MintChildWithClaim)
    {
        nativeThrowUnless(666, sender() == self.parent);
        
        self.referrer = msg.referrer;
        self.lastClaimTime = now();

        send(SendParameters
        {
            to: self.parent,
            body: Claim {
                user: self.owner, 
                referrer: self.referrer,
                boost: 0,
                amount: 0
                }.toCell(),
            value: 0,
            mode: SendRemainingValue
        });
    }

    receive(msg: AddReferral)
    {
        let referralAddress: Address = contractAddress(initOf ClaimChild(self.parent, msg.from, self.master, self.interval));
        let ctx: Context = context();
        nativeThrowUnless(666, ctx.sender == self.parent || ctx.sender == referralAddress);
        
        self.referralsCount = self.referralsCount + 1;

        send(SendParameters
        {
            to: self.parent,
            value: 0,
            mode: SendRemainingValue
        });
    }

    receive(msg: Boost)
    {
        let ctx: Context = context();
        nativeThrowUnless(666, ctx.sender == self.master || ctx.sender == self.parent);

        self.boost = self.boost + msg.amount;

        send(SendParameters{
                to: ctx.sender,
                value: 0,
                mode: SendRemainingValue
            });
    }

    receive(msg: Web3Ban)
    {
        let ctx: Context = context();
        nativeThrowUnless(666, ctx.sender == self.master || ctx.sender == self.parent);
        self.referralsCount = msg.referralsCount;
        self.boost = msg.boost;
        self.ban = msg.ban;
    }

    receive() 
    {
        let ctx: Context = context();
        nativeThrowUnless(1001, ctx.value >= ton("0.12"));

        let currentTime: Int = now();
        if(currentTime - self.lastClaimTime >= self.interval && !self.ban)
        {
            self.lastClaimTime = currentTime;

            let amount: Int = self.referralsCount;
            self.referralsCount = 0;

            send(SendParameters
            {
                to: self.parent,
                body: Claim {
                    user: self.owner, 
                    referrer: self.referrer,
                    amount: amount,
                    boost: self.boost
                    }.toCell(),
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors
            });
        }
        else
        {
            send(SendParameters{
                to: ctx.sender,
                value: 0,
                mode: SendRemainingValue,
                body: "🦘".asComment()
            });
        }
    }

    get fun lastClaimTime(): Int {
        return self.lastClaimTime;
    }

    get fun parent(): Address {
        return self.parent;
    }

    get fun master(): Address {
        return self.master;
    }

    get fun referrer(): Address? {
        return self.referrer;
    }

    get fun interval(): Int {
        return self.interval;
    }

    get fun referralsCount(): Int {
        return self.referralsCount;
    }

    get fun ban(): Bool {
        return self.ban;
    }

    get fun get_state(): ChildState {
        return ChildState {    
            interval: self.interval, 
            lastClaimTime: self.lastClaimTime,
            referralsCount: self.referralsCount,    
            boost: self.boost
        };
    }
}
