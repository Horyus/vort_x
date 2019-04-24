import { VtxPollCb }    from '../../state/vtxpoll';
import { State }        from '../../state/index';
import { Dispatch }     from 'redux';
import {
    TxInfos,
    TxStatus
}                       from '../../state/txs';
import { TxSet }        from '../../txs/actions/actions';
import { VtxeventsAdd } from '../../vtxevents/actions/actions';
import {
    VtxeventErrorTypes,
    VtxeventsError,
    VtxeventsTxConfirmed,
    VtxeventsTxError,
    VtxeventsTypes
}                       from '../../state/vtxevents';
import { ContractsNew } from '../../contracts/actions/actions';

export const poll_transaction: VtxPollCb = async (state: State, emit: Dispatch, new_block: boolean): Promise<void> => {

    try {
        const current_block: number = state.blocks.current_height || await state.vtxconfig.web3.eth.getBlockNumber();
        const threshold: number = state.vtxconfig.confirmation_threshold;

        for (const tx of Object.keys(state.txs)) {

            if (!new_block && state.txs[tx].status !== TxStatus.Unknown) continue ;

            switch (state.txs[tx].status) {
                case TxStatus.Unknown:
                    const infos: TxInfos = await state.vtxconfig.web3.eth.getTransaction(tx);
                    emit(TxSet(tx, infos, TxStatus.Confirming));

                case TxStatus.Confirming:
                    const receipt: any = await state.vtxconfig.web3.eth.getTransactionReceipt(tx);

                    if (receipt.contractAddress && !state.txs[tx].contract_address) {
                        emit(TxSet(tx, {}, TxStatus.Confirming, receipt.contractAddress));
                        if (state.txs[tx].new_contract) {
                            emit(ContractsNew(state.txs[tx].new_contract.name, receipt.contractAddress, {
                                permanent: state.txs[tx].new_contract.permanent,
                                alias: state.txs[tx].new_contract.alias,
                                balance: state.txs[tx].new_contract.balance
                            }));
                        }
                    }

                    if (receipt.status === 1) {
                        emit(TxSet(tx, {}, TxStatus.Error));
                        emit(VtxeventsAdd({
                            type: VtxeventsTypes.TxError,
                            tx_hash: tx
                        } as VtxeventsTxError));
                    } else if (current_block - receipt.blockNumber >= threshold) {
                        emit(TxSet(tx, {}, TxStatus.Confirmed));
                        emit(VtxeventsAdd({
                            type: VtxeventsTypes.TxConfirmed,
                            tx_hash: tx
                        } as VtxeventsTxConfirmed));
                    }
            }
        }
    } catch (e) {
        emit(VtxeventsAdd({
            type: VtxeventsTypes.Error,
            e,
            error_type: VtxeventErrorTypes.TxFetchError
        } as VtxeventsError));
    }
};

export const poll_transaction_interval: number = 1;
