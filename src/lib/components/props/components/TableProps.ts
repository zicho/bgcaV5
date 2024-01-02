type TableProps = {
    limit: number;
    pageNo: number;
    totalPages: number;
    totalHits: number;
    resultsEmpty: boolean;
    resultsEmptyMessage?: string;
}

export default TableProps;
