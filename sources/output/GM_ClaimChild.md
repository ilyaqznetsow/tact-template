# TACT Compilation Report
Contract: ClaimChild
BOC Size: 2008 bytes

# Types
Total Types: 24

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## ChildData
TLB: `_ interval:uint32 lastClaimTime:uint64 referralsCount:uint32 boost:uint32 owner:address master:address admin:Maybe address referrer:Maybe address ban:bool = ChildData`
Signature: `ChildData{interval:uint32,lastClaimTime:uint64,referralsCount:uint32,boost:uint32,owner:address,master:address,admin:Maybe address,referrer:Maybe address,ban:bool}`

## Mint
TLB: `mint#00000001 user:address referrer:Maybe address interval:uint32 admin:address = Mint`
Signature: `Mint{user:address,referrer:Maybe address,interval:uint32,admin:address}`

## Claim
TLB: `claim#00000002 amount:coins boost:coins user:address referrer:Maybe address = Claim`
Signature: `Claim{amount:coins,boost:coins,user:address,referrer:Maybe address}`

## AddReferral
TLB: `add_referral#00000003 from:address to:address = AddReferral`
Signature: `AddReferral{from:address,to:address}`

## Referrer
TLB: `referrer#00000004 user:Maybe address withClaim:bool = Referrer`
Signature: `Referrer{user:Maybe address,withClaim:bool}`

## Boost
TLB: `boost#00000005 amount:uint32 = Boost`
Signature: `Boost{amount:uint32}`

## OwnerWithdrawalRequest
TLB: `owner_withdrawal_request#00000006 amount:coins jettonWallet:address = OwnerWithdrawalRequest`
Signature: `OwnerWithdrawalRequest{amount:coins,jettonWallet:address}`

## OwnerWithdrawalTonRequest
TLB: `owner_withdrawal_ton_request#00000007  = OwnerWithdrawalTonRequest`
Signature: `OwnerWithdrawalTonRequest{}`

## MasterConfig
TLB: `master_config#00000008 jettonWallet:address interval:uint32 claimAmount:coins referralReward:coins boostReward:coins = MasterConfig`
Signature: `MasterConfig{jettonWallet:address,interval:uint32,claimAmount:coins,referralReward:coins,boostReward:coins}`

## CustomMessage
TLB: `custom_message#00000009 to:address payload:Maybe ^cell = CustomMessage`
Signature: `CustomMessage{to:address,payload:Maybe ^cell}`

## Referral
TLB: `referral#00000010 referral:address referrer:address = Referral`
Signature: `Referral{referral:address,referrer:address}`

## Web3Ban
TLB: `web3_ban#00000011 ban:bool referralsCount:uint32 boost:uint32 = Web3Ban`
Signature: `Web3Ban{ban:bool,referralsCount:uint32,boost:uint32}`

## ChangeMinter
TLB: `change_minter#00000012 newMinter:address = ChangeMinter`
Signature: `ChangeMinter{newMinter:address}`

## TokenNotification
TLB: `token_notification#7362d09c queryId:uint64 amount:coins from:address forwardPayload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{queryId:uint64,amount:coins,from:address,forwardPayload:remainder<slice>}`

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 queryId:uint64 amount:coins destination:address responseDestination:Maybe address customPayload:Maybe ^cell forwardTonAmount:coins forwardPayload:Maybe ^slice = TokenTransfer`
Signature: `TokenTransfer{queryId:uint64,amount:coins,destination:address,responseDestination:Maybe address,customPayload:Maybe ^cell,forwardTonAmount:coins,forwardPayload:Maybe ^slice}`

## MasterData
TLB: `_ jettonWallet:Maybe address interval:uint32 minter:address admin:address claimAmount:int257 referralReward:int257 boostReward:int257 = MasterData`
Signature: `MasterData{jettonWallet:Maybe address,interval:uint32,minter:address,admin:address,claimAmount:int257,referralReward:int257,boostReward:int257}`

# Get Methods
Total Get Methods: 2

## get_child_data

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract