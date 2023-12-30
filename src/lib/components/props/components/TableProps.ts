type TableProps = {
    limit: number;
    searchParam: string;
    pageNo: number;
    totalPages: number;
    totalHits: number;
    resultsEmpty: boolean;
    resultsEmptyMessage?: string;
}

export default TableProps;
