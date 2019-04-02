import { Action } from 'redux';
import { Block }  from '../../state/blocks';

export const BlocksActions = {
    BlocksInitialHeight: '[VTX][BLOCKS] INITIAL_HEIGHT',
    BlocksFetch: '[VTX][BLOCKS] FETCH',
    BlocksFetched: '[VTX][BLOCKS] FETCHED',
    BlocksFetchedHeight: '[VTX][BLOCKS] FETCHED_HEIGHT',
    BlocksNew: '[VTX][BLOCKS] NEW'
};

export interface IBlocksInitialHeight extends Action<string> {
    height: number;
}

export interface IBlocksFetch extends Action<string> {
    height: number;
}

export interface IBlocksFetchedHeight extends Action<string> {
    height: number;
}

export interface IBlocksFetched extends Action<string> {
    number: number;
    block_infos: Block;
}

export interface IBlocksNew extends Action<string> {
    number: number;
    block_infos: Block;
}

export type BlocksActionTypes =
    IBlocksInitialHeight
    | IBlocksFetch
    | IBlocksFetchedHeight
    | IBlocksNew
    | IBlocksFetched;
