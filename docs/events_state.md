---
id: events_state
title: Events State
sidebar_label: State
---

All these types are accessible in TS from `ethvtx/lib/state`;

## EventsFollowed

```typescript
{
    event: string;
    arguments: {
        [key: string]: string;
    };
    contract: string;
    address: string;
    signature: string;
    last_fetched: number;
}
```

## Web3Event

```typescript
{
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
        topics: string[]
    };
}
```

## EventsDataStore

```typescript
{
    [key: string]: Web3Event[];
}
```

## EventsFollowedStore

```typescript
{
    [key: string]: EventsFollowed;
}
```

## EventsEntitySection

```typescript
{
    followed: EventsFollowedStore;
    data: EventsDataStore;
}
```

## EventsSection

This is what you can access at `state.events`.

```typescript
{
    [key: string]: EventsEntitySection;
}
```


