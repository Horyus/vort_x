---
id: events_actions
title: Events Actions
sidebar_label: Actions
---

All these types and functions are accessible from `ethvtx/lib/actions`.

## Identifiers

```js
export const EventsActions = {
    EventsFollow: '[VTX][EVM EVENTS] FOLLOW',
    EventsCaught: '[VTX][EVM EVENTS] CAUGHT',
    EventsSetHeight: '[VTX][EVM EVENTS] SET_HEIGHT',
    EventsClear: '[VTX][EVM EVENTS] CLEAR'
};
```

## Internal Actions

These actions are used internally by the store to make things work. You should not use them.


## `EventsClear(entity: string) => IEventsClear`

Clears all events data stored for a specific entity

## `EventsFollow(entity: string, event: string, args: any, contract: string, address: string, signature: string) => IEventsFollow`

Start following a specific event. Will store events triggered by the specified address in the store.

## `EventsCaught(entity: string, signature: string, infos: Web3Event) => IEventsCaught`

Called internally to store a new caught event.

## `EventsSetHeight = (entity: string, signature: string, new_height: number) => IEventsSetHeight`

Called internally to track current fetch height and prevent duplicate requests.
