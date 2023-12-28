type TableParams = {
    searchParam: string,
    pageNo: number,
    limit: number,
}

export function getTableParams(url: URL): TableParams {

    const searchParam = url.searchParams.get("search") || '';
    const pageNo = Number(url.searchParams.get("page")) || 1;

    const validLimitValues = [10, 25, 50, 100];
    const limit = validLimitValues.includes(
        Number(url.searchParams.get("limit")))
        ? Number(url.searchParams.get("limit"))
        : 10;

    return {
        searchParam,
        pageNo,
        limit
    }
}