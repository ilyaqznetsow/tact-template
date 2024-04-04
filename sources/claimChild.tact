struct ChildData {
    interval: Int as uint32 = 0;
    lastClaimTime: Int as uint64 = 0;
    referralsCount: Int as uint32 = 0;
    boost: Int as uint32 = 0;

    owner: Address;
    master: Address;
    admin: Address? = null;
    referrer: Address? = null;

    ban: Bool = false;
}

contract ClaimChild with Ownable {
    owner: Address;
    master: Address;
    admin: Address? = null;
    interval: Int as uint32 = 60 * 60 * 24;
    lastClaimTime: Int as uint64 = 0;
    referralsCount: Int as uint32 = 0;
    referrer: Address? = null;
    boost: Int as uint32 = 0;
    ban: Bool = false;

    init(master: Address, owner: Address) {
        self.master = master;
        self.owner = owner;
    }

    receive(msg: Mint) {        
        nativeThrowUnless(666, sender() == self.master);
        nativeThrowUnless(667, self.lastClaimTime > 0);

        self.referrer = msg.referrer;
        self.lastClaimTime = now();
        self.admin = msg.admin;
        self.interval = msg.interval;

        send(SendParameters
        {
            to: self.master,
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

    receive(msg: AddReferral) {
        let ctx: Context = context();
        nativeThrowUnless(666, ctx.sender == self.master);
        
        self.referralsCount = self.referralsCount + 1;

        send(SendParameters
        {
            to: self.master,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors
        });
    }

    receive(msg: Boost) {
        let ctx: Context = context();
        nativeThrowUnless(666, ctx.sender == self.admin || ctx.sender == self.master);

        self.boost = self.boost + msg.amount;

        send(SendParameters{
                to: ctx.sender,
                value: 0,
                mode: SendRemainingValue + SendIgnoreErrors
            });
    }

    receive(msg: Web3Ban) {
        let ctx: Context = context();
        nativeThrowUnless(666, ctx.sender == self.admin || ctx.sender == self.master);
        
        self.referralsCount = msg.referralsCount;
        self.boost = msg.boost;
        self.ban = msg.ban;
    }

    receive() {
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
                to: self.master,
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
                mode: SendRemainingValue + SendIgnoreErrors,
                body: "🦘".asComment()
            });
        }
    }

    get fun get_child_data(): ChildData {
        return ChildData {    
            interval: self.interval, 
            lastClaimTime: self.lastClaimTime,
            referralsCount: self.referralsCount,    
            boost: self.boost,
            owner: self.owner,
            master: self.master,
            admin: self.admin,
            referrer: self.referrer,
            ban: self.ban
        };
    }
}
