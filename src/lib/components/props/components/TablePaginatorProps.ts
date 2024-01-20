type TablePaginatorProps = {
    id: string;
    limit: number;
    pageNo: number;
    searchParam?: string;
    totalHits: number;
    totalPages: number;
    pageNoArray: number[]
}

export default TablePaginatorProps;
