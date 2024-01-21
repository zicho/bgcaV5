import type TableProps from "./TableProps";

type TablePaginatorProps = Omit<TableProps, 'resultsEmpty' | 'resultsEmptyMessage'> & {
    id: string;
    pageNoArray: number[];
};

export default TablePaginatorProps;
