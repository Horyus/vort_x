import { Reducer }                      from 'redux';
import { TxSection }                    from '../../state/txs';
import {
    ITxAdd,
    ITxError,
    ITxRemove,
    ITxReset,
    ITxSet,
    TxActions,
    TxActionTypes
}                                          from '../actions/actionTypes';
import { TxAddReducer }                    from './TxAdd';
import { TxRemoveReducer }                 from './TxRemove';
import { TxSetReducer }                    from './TxSet';
import { TxErrorReducer }                  from './TxError';
import { TxResetReducer }                  from './TxReset';
import { InitialState }                    from '../../state/index';

export const TxReducer: Reducer<TxSection, TxActionTypes> = (state: TxSection = InitialState.txs, action: TxActionTypes): TxSection => {
    switch (action.type) {
        case TxActions.TxAdd:
            return TxAddReducer(state, action as ITxAdd);
        case TxActions.TxRemove:
            return TxRemoveReducer(state, action as ITxRemove);
        case TxActions.TxSet:
            return TxSetReducer(state, action as ITxSet);
        case TxActions.TxError:
            return TxErrorReducer(state, action as ITxError);
        case TxActions.TxReset:
            return TxResetReducer(state, action as ITxReset);
        default:
            return state;
    }
};
