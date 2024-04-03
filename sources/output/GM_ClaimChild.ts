import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type MintChildWithClaim = {
    $$type: 'MintChildWithClaim';
    user: Address;
    referrer: Address | null;
}

export function storeMintChildWithClaim(src: MintChildWithClaim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.referrer);
    };
}

export function loadMintChildWithClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _referrer = sc_0.loadMaybeAddress();
    return { $$type: 'MintChildWithClaim' as const, user: _user, referrer: _referrer };
}

function loadTupleMintChildWithClaim(source: TupleReader) {
    let _user = source.readAddress();
    let _referrer = source.readAddressOpt();
    return { $$type: 'MintChildWithClaim' as const, user: _user, referrer: _referrer };
}

function storeTupleMintChildWithClaim(source: MintChildWithClaim) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeAddress(source.referrer);
    return builder.build();
}

function dictValueParserMintChildWithClaim(): DictionaryValue<MintChildWithClaim> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintChildWithClaim(src)).endCell());
        },
        parse: (src) => {
            return loadMintChildWithClaim(src.loadRef().beginParse());
        }
    }
}

export type MintChildNoClaim = {
    $$type: 'MintChildNoClaim';
    user: Address;
    referrer: Address | null;
}

export function storeMintChildNoClaim(src: MintChildNoClaim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(17, 32);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.referrer);
    };
}

export function loadMintChildNoClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 17) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _referrer = sc_0.loadMaybeAddress();
    return { $$type: 'MintChildNoClaim' as const, user: _user, referrer: _referrer };
}

function loadTupleMintChildNoClaim(source: TupleReader) {
    let _user = source.readAddress();
    let _referrer = source.readAddressOpt();
    return { $$type: 'MintChildNoClaim' as const, user: _user, referrer: _referrer };
}

function storeTupleMintChildNoClaim(source: MintChildNoClaim) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeAddress(source.referrer);
    return builder.build();
}

function dictValueParserMintChildNoClaim(): DictionaryValue<MintChildNoClaim> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeMintChildNoClaim(src)).endCell());
        },
        parse: (src) => {
            return loadMintChildNoClaim(src.loadRef().beginParse());
        }
    }
}

export type Claim = {
    $$type: 'Claim';
    amount: bigint;
    boost: bigint;
    user: Address;
    referrer: Address | null;
}

export function storeClaim(src: Claim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2, 32);
        b_0.storeCoins(src.amount);
        b_0.storeCoins(src.boost);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.referrer);
    };
}

export function loadClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _boost = sc_0.loadCoins();
    let _user = sc_0.loadAddress();
    let _referrer = sc_0.loadMaybeAddress();
    return { $$type: 'Claim' as const, amount: _amount, boost: _boost, user: _user, referrer: _referrer };
}

function loadTupleClaim(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _boost = source.readBigNumber();
    let _user = source.readAddress();
    let _referrer = source.readAddressOpt();
    return { $$type: 'Claim' as const, amount: _amount, boost: _boost, user: _user, referrer: _referrer };
}

function storeTupleClaim(source: Claim) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.boost);
    builder.writeAddress(source.user);
    builder.writeAddress(source.referrer);
    return builder.build();
}

function dictValueParserClaim(): DictionaryValue<Claim> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaim(src)).endCell());
        },
        parse: (src) => {
            return loadClaim(src.loadRef().beginParse());
        }
    }
}

export type AddReferral = {
    $$type: 'AddReferral';
    from: Address;
    to: Address;
}

export function storeAddReferral(src: AddReferral) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3, 32);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.to);
    };
}

export function loadAddReferral(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) { throw Error('Invalid prefix'); }
    let _from = sc_0.loadAddress();
    let _to = sc_0.loadAddress();
    return { $$type: 'AddReferral' as const, from: _from, to: _to };
}

function loadTupleAddReferral(source: TupleReader) {
    let _from = source.readAddress();
    let _to = source.readAddress();
    return { $$type: 'AddReferral' as const, from: _from, to: _to };
}

function storeTupleAddReferral(source: AddReferral) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.from);
    builder.writeAddress(source.to);
    return builder.build();
}

function dictValueParserAddReferral(): DictionaryValue<AddReferral> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeAddReferral(src)).endCell());
        },
        parse: (src) => {
            return loadAddReferral(src.loadRef().beginParse());
        }
    }
}

export type Referrer = {
    $$type: 'Referrer';
    user: Address | null;
    withClaim: boolean;
}

export function storeReferrer(src: Referrer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4, 32);
        b_0.storeAddress(src.user);
        b_0.storeBit(src.withClaim);
    };
}

export function loadReferrer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadMaybeAddress();
    let _withClaim = sc_0.loadBit();
    return { $$type: 'Referrer' as const, user: _user, withClaim: _withClaim };
}

function loadTupleReferrer(source: TupleReader) {
    let _user = source.readAddressOpt();
    let _withClaim = source.readBoolean();
    return { $$type: 'Referrer' as const, user: _user, withClaim: _withClaim };
}

function storeTupleReferrer(source: Referrer) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeBoolean(source.withClaim);
    return builder.build();
}

function dictValueParserReferrer(): DictionaryValue<Referrer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReferrer(src)).endCell());
        },
        parse: (src) => {
            return loadReferrer(src.loadRef().beginParse());
        }
    }
}

export type Boost = {
    $$type: 'Boost';
    amount: bigint;
}

export function storeBoost(src: Boost) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(5, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadBoost(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 5) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Boost' as const, amount: _amount };
}

function loadTupleBoost(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Boost' as const, amount: _amount };
}

function storeTupleBoost(source: Boost) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserBoost(): DictionaryValue<Boost> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBoost(src)).endCell());
        },
        parse: (src) => {
            return loadBoost(src.loadRef().beginParse());
        }
    }
}

export type OwnerWithdrawalRequest = {
    $$type: 'OwnerWithdrawalRequest';
    amount: bigint;
    tokenAddress: Address;
}

export function storeOwnerWithdrawalRequest(src: OwnerWithdrawalRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(6, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.tokenAddress);
    };
}

export function loadOwnerWithdrawalRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 6) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _tokenAddress = sc_0.loadAddress();
    return { $$type: 'OwnerWithdrawalRequest' as const, amount: _amount, tokenAddress: _tokenAddress };
}

function loadTupleOwnerWithdrawalRequest(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _tokenAddress = source.readAddress();
    return { $$type: 'OwnerWithdrawalRequest' as const, amount: _amount, tokenAddress: _tokenAddress };
}

function storeTupleOwnerWithdrawalRequest(source: OwnerWithdrawalRequest) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.tokenAddress);
    return builder.build();
}

function dictValueParserOwnerWithdrawalRequest(): DictionaryValue<OwnerWithdrawalRequest> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnerWithdrawalRequest(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerWithdrawalRequest(src.loadRef().beginParse());
        }
    }
}

export type OwnerWithdrawalTonRequest = {
    $$type: 'OwnerWithdrawalTonRequest';
}

export function storeOwnerWithdrawalTonRequest(src: OwnerWithdrawalTonRequest) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(7, 32);
    };
}

export function loadOwnerWithdrawalTonRequest(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 7) { throw Error('Invalid prefix'); }
    return { $$type: 'OwnerWithdrawalTonRequest' as const };
}

function loadTupleOwnerWithdrawalTonRequest(source: TupleReader) {
    return { $$type: 'OwnerWithdrawalTonRequest' as const };
}

function storeTupleOwnerWithdrawalTonRequest(source: OwnerWithdrawalTonRequest) {
    let builder = new TupleBuilder();
    return builder.build();
}

function dictValueParserOwnerWithdrawalTonRequest(): DictionaryValue<OwnerWithdrawalTonRequest> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnerWithdrawalTonRequest(src)).endCell());
        },
        parse: (src) => {
            return loadOwnerWithdrawalTonRequest(src.loadRef().beginParse());
        }
    }
}

export type TokenConfig = {
    $$type: 'TokenConfig';
    tokenAddress: Address;
    claimAmount: bigint;
    referralReward: bigint;
    boostReward: bigint;
}

export function storeTokenConfig(src: TokenConfig) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(8, 32);
        b_0.storeAddress(src.tokenAddress);
        b_0.storeCoins(src.claimAmount);
        b_0.storeCoins(src.referralReward);
        b_0.storeCoins(src.boostReward);
    };
}

export function loadTokenConfig(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 8) { throw Error('Invalid prefix'); }
    let _tokenAddress = sc_0.loadAddress();
    let _claimAmount = sc_0.loadCoins();
    let _referralReward = sc_0.loadCoins();
    let _boostReward = sc_0.loadCoins();
    return { $$type: 'TokenConfig' as const, tokenAddress: _tokenAddress, claimAmount: _claimAmount, referralReward: _referralReward, boostReward: _boostReward };
}

function loadTupleTokenConfig(source: TupleReader) {
    let _tokenAddress = source.readAddress();
    let _claimAmount = source.readBigNumber();
    let _referralReward = source.readBigNumber();
    let _boostReward = source.readBigNumber();
    return { $$type: 'TokenConfig' as const, tokenAddress: _tokenAddress, claimAmount: _claimAmount, referralReward: _referralReward, boostReward: _boostReward };
}

function storeTupleTokenConfig(source: TokenConfig) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.tokenAddress);
    builder.writeNumber(source.claimAmount);
    builder.writeNumber(source.referralReward);
    builder.writeNumber(source.boostReward);
    return builder.build();
}

function dictValueParserTokenConfig(): DictionaryValue<TokenConfig> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenConfig(src)).endCell());
        },
        parse: (src) => {
            return loadTokenConfig(src.loadRef().beginParse());
        }
    }
}

export type CustomMessage = {
    $$type: 'CustomMessage';
    to: Address;
    payload: Cell | null;
}

export function storeCustomMessage(src: CustomMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(9, 32);
        b_0.storeAddress(src.to);
        if (src.payload !== null && src.payload !== undefined) { b_0.storeBit(true).storeRef(src.payload); } else { b_0.storeBit(false); }
    };
}

export function loadCustomMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 9) { throw Error('Invalid prefix'); }
    let _to = sc_0.loadAddress();
    let _payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'CustomMessage' as const, to: _to, payload: _payload };
}

function loadTupleCustomMessage(source: TupleReader) {
    let _to = source.readAddress();
    let _payload = source.readCellOpt();
    return { $$type: 'CustomMessage' as const, to: _to, payload: _payload };
}

function storeTupleCustomMessage(source: CustomMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.to);
    builder.writeCell(source.payload);
    return builder.build();
}

function dictValueParserCustomMessage(): DictionaryValue<CustomMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCustomMessage(src)).endCell());
        },
        parse: (src) => {
            return loadCustomMessage(src.loadRef().beginParse());
        }
    }
}

export type Referral = {
    $$type: 'Referral';
    referral: Address;
    referrer: Address;
}

export function storeReferral(src: Referral) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(16, 32);
        b_0.storeAddress(src.referral);
        b_0.storeAddress(src.referrer);
    };
}

export function loadReferral(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 16) { throw Error('Invalid prefix'); }
    let _referral = sc_0.loadAddress();
    let _referrer = sc_0.loadAddress();
    return { $$type: 'Referral' as const, referral: _referral, referrer: _referrer };
}

function loadTupleReferral(source: TupleReader) {
    let _referral = source.readAddress();
    let _referrer = source.readAddress();
    return { $$type: 'Referral' as const, referral: _referral, referrer: _referrer };
}

function storeTupleReferral(source: Referral) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.referral);
    builder.writeAddress(source.referrer);
    return builder.build();
}

function dictValueParserReferral(): DictionaryValue<Referral> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReferral(src)).endCell());
        },
        parse: (src) => {
            return loadReferral(src.loadRef().beginParse());
        }
    }
}

export type Web3Ban = {
    $$type: 'Web3Ban';
    ban: boolean;
    referralsCount: bigint;
    boost: bigint;
}

export function storeWeb3Ban(src: Web3Ban) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(18, 32);
        b_0.storeBit(src.ban);
        b_0.storeUint(src.referralsCount, 32);
        b_0.storeUint(src.boost, 32);
    };
}

export function loadWeb3Ban(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 18) { throw Error('Invalid prefix'); }
    let _ban = sc_0.loadBit();
    let _referralsCount = sc_0.loadUintBig(32);
    let _boost = sc_0.loadUintBig(32);
    return { $$type: 'Web3Ban' as const, ban: _ban, referralsCount: _referralsCount, boost: _boost };
}

function loadTupleWeb3Ban(source: TupleReader) {
    let _ban = source.readBoolean();
    let _referralsCount = source.readBigNumber();
    let _boost = source.readBigNumber();
    return { $$type: 'Web3Ban' as const, ban: _ban, referralsCount: _referralsCount, boost: _boost };
}

function storeTupleWeb3Ban(source: Web3Ban) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.ban);
    builder.writeNumber(source.referralsCount);
    builder.writeNumber(source.boost);
    return builder.build();
}

function dictValueParserWeb3Ban(): DictionaryValue<Web3Ban> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWeb3Ban(src)).endCell());
        },
        parse: (src) => {
            return loadWeb3Ban(src.loadRef().beginParse());
        }
    }
}

export type SetCode = {
    $$type: 'SetCode';
    newCode: Cell;
}

export function storeSetCode(src: SetCode) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(19, 32);
        b_0.storeRef(src.newCode);
    };
}

export function loadSetCode(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 19) { throw Error('Invalid prefix'); }
    let _newCode = sc_0.loadRef();
    return { $$type: 'SetCode' as const, newCode: _newCode };
}

function loadTupleSetCode(source: TupleReader) {
    let _newCode = source.readCell();
    return { $$type: 'SetCode' as const, newCode: _newCode };
}

function storeTupleSetCode(source: SetCode) {
    let builder = new TupleBuilder();
    builder.writeCell(source.newCode);
    return builder.build();
}

function dictValueParserSetCode(): DictionaryValue<SetCode> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetCode(src)).endCell());
        },
        parse: (src) => {
            return loadSetCode(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    queryId: bigint;
    amount: bigint;
    from: Address;
    forwardPayload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forwardPayload = source.readCell();
    return { $$type: 'TokenNotification' as const, queryId: _queryId, amount: _amount, from: _from, forwardPayload: _forwardPayload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    queryId: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, queryId: _queryId };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    queryId: bigint;
    amount: bigint;
    destination: Address;
    responseDestination: Address | null;
    customPayload: Cell | null;
    forwardTonAmount: bigint;
    forwardPayload: Cell | null;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardTonAmount);
        if (src.forwardPayload !== null && src.forwardPayload !== undefined) { b_0.storeBit(true).storeRef(src.forwardPayload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _responseDestination = sc_0.loadMaybeAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardTonAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _responseDestination = source.readAddressOpt();
    let _customPayload = source.readCellOpt();
    let _forwardTonAmount = source.readBigNumber();
    let _forwardPayload = source.readCellOpt();
    return { $$type: 'TokenTransfer' as const, queryId: _queryId, amount: _amount, destination: _destination, responseDestination: _responseDestination, customPayload: _customPayload, forwardTonAmount: _forwardTonAmount, forwardPayload: _forwardPayload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardTonAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type ChildState = {
    $$type: 'ChildState';
    interval: bigint;
    lastClaimTime: bigint;
    referralsCount: bigint;
    boost: bigint;
}

export function storeChildState(src: ChildState) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.interval, 32);
        b_0.storeUint(src.lastClaimTime, 64);
        b_0.storeUint(src.referralsCount, 32);
        b_0.storeUint(src.boost, 32);
    };
}

export function loadChildState(slice: Slice) {
    let sc_0 = slice;
    let _interval = sc_0.loadUintBig(32);
    let _lastClaimTime = sc_0.loadUintBig(64);
    let _referralsCount = sc_0.loadUintBig(32);
    let _boost = sc_0.loadUintBig(32);
    return { $$type: 'ChildState' as const, interval: _interval, lastClaimTime: _lastClaimTime, referralsCount: _referralsCount, boost: _boost };
}

function loadTupleChildState(source: TupleReader) {
    let _interval = source.readBigNumber();
    let _lastClaimTime = source.readBigNumber();
    let _referralsCount = source.readBigNumber();
    let _boost = source.readBigNumber();
    return { $$type: 'ChildState' as const, interval: _interval, lastClaimTime: _lastClaimTime, referralsCount: _referralsCount, boost: _boost };
}

function storeTupleChildState(source: ChildState) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.interval);
    builder.writeNumber(source.lastClaimTime);
    builder.writeNumber(source.referralsCount);
    builder.writeNumber(source.boost);
    return builder.build();
}

function dictValueParserChildState(): DictionaryValue<ChildState> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChildState(src)).endCell());
        },
        parse: (src) => {
            return loadChildState(src.loadRef().beginParse());
        }
    }
}

 type ClaimChild_init_args = {
    $$type: 'ClaimChild_init_args';
    parent: Address;
    user: Address;
    master: Address;
    interval: bigint;
}

function initClaimChild_init_args(src: ClaimChild_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.parent);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.master);
        let b_1 = new Builder();
        b_1.storeInt(src.interval, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function ClaimChild_init(parent: Address, user: Address, master: Address, interval: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initClaimChild_init_args({ $$type: 'ClaimChild_init_args', parent, user, master, interval })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ClaimChild_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const ClaimChild_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MintChildWithClaim","header":1,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"MintChildNoClaim","header":17,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"Claim","header":2,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"boost","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"AddReferral","header":3,"fields":[{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Referrer","header":4,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":true}},{"name":"withClaim","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"Boost","header":5,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"OwnerWithdrawalRequest","header":6,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OwnerWithdrawalTonRequest","header":7,"fields":[]},
    {"name":"TokenConfig","header":8,"fields":[{"name":"tokenAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"claimAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"referralReward","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"boostReward","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CustomMessage","header":9,"fields":[{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Referral","header":16,"fields":[{"name":"referral","type":{"kind":"simple","type":"address","optional":false}},{"name":"referrer","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Web3Ban","header":18,"fields":[{"name":"ban","type":{"kind":"simple","type":"bool","optional":false}},{"name":"referralsCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"boost","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"SetCode","header":19,"fields":[{"name":"newCode","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":true}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardTonAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"slice","optional":true}}]},
    {"name":"ChildState","header":null,"fields":[{"name":"interval","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"lastClaimTime","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"referralsCount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"boost","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const ClaimChild_getters: ABIGetter[] = [
    {"name":"lastClaimTime","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"parent","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"master","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"referrer","arguments":[],"returnType":{"kind":"simple","type":"address","optional":true}},
    {"name":"interval","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"referralsCount","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"ban","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"get_state","arguments":[],"returnType":{"kind":"simple","type":"ChildState","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const ClaimChild_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"MintChildNoClaim"}},
    {"receiver":"internal","message":{"kind":"typed","type":"MintChildWithClaim"}},
    {"receiver":"internal","message":{"kind":"typed","type":"AddReferral"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Boost"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Web3Ban"}},
    {"receiver":"internal","message":{"kind":"empty"}},
]

export class ClaimChild implements Contract {
    
    static async init(parent: Address, user: Address, master: Address, interval: bigint) {
        return await ClaimChild_init(parent, user, master, interval);
    }
    
    static async fromInit(parent: Address, user: Address, master: Address, interval: bigint) {
        const init = await ClaimChild_init(parent, user, master, interval);
        const address = contractAddress(0, init);
        return new ClaimChild(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ClaimChild(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ClaimChild_types,
        getters: ClaimChild_getters,
        receivers: ClaimChild_receivers,
        errors: ClaimChild_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: MintChildNoClaim | MintChildWithClaim | AddReferral | Boost | Web3Ban | null) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintChildNoClaim') {
            body = beginCell().store(storeMintChildNoClaim(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'MintChildWithClaim') {
            body = beginCell().store(storeMintChildWithClaim(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'AddReferral') {
            body = beginCell().store(storeAddReferral(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Boost') {
            body = beginCell().store(storeBoost(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Web3Ban') {
            body = beginCell().store(storeWeb3Ban(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getLastClaimTime(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('lastClaimTime', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getParent(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('parent', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getMaster(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('master', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getReferrer(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('referrer', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getInterval(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('interval', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getReferralsCount(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('referralsCount', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBan(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('ban', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getGetState(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_state', builder.build())).stack;
        const result = loadTupleChildState(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}