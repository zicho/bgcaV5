type TableProps = {
    limit: number;
    pageNo: number;
    searchParam?: string;
    totalPages: number;
    totalHits: number;
    resultsEmpty: boolean;
    resultsEmptyMessage?: string;
    loading?: boolean
}

export default TableProps;
