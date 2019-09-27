export interface EventsFollowed {
    event: string;
    arguments: {
        [key: string]: string;
    };
    contract: string;
    address: string;
    signature: string;
    last_fetched: number;
}
export interface Web3Event {
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    address: string;
    type: string;
    id: string;
    returnValues: {
        [key: string]: any;
    };
    event: string;
    signature: string;
    raw: {
        data: string;
        topics: string[];
    };
}
export interface EventsDataStore {
    [key: string]: Web3Event[];
}
export interface EventsFollowedStore {
    [key: string]: EventsFollowed;
}
export interface EventsEntitySection {
    followed: EventsFollowedStore;
    data: EventsDataStore;
}
export interface EventsSection {
    [key: string]: EventsEntitySection;
}
