import { redirect } from "@sveltejs/kit";

type TableParams = {
    searchParam: string,
    pageNo: number,
    limit: number,
}

type TableRedirectHandlerType = TableParams & {
    totalPages: number,
    fallbackUrl: URL
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

/**
 * This method handles any eventual redirects that need to be done due to erroneous state in query parameters.
 *
 * For example, if `pageNo` is less than zero or exceeds the total number of pages,
 * it will redirect to page 1 using the fallback URL.
 *
 * @param {TableRedirectHandlerType} params - The parameters needed to handle the redirect.
 * @returns {void} - Returns void if everything goes well.
 * @throws {import("@sveltejs/kit").Navigation} - Throws a redirect.
 */
export function handleTableRedirect(params: TableRedirectHandlerType): void {

    const { pageNo, totalPages, searchParam, limit, fallbackUrl } = params;

    if ((pageNo > totalPages || pageNo < 1) && totalPages != 0) {
        // totalpages != 0 is needed to not crash when getting empty results, should get a nicer fix
        if (searchParam) {
            throw redirect(302, `${fallbackUrl.pathname}?limit=${limit}&search=${searchParam}`);
        }

        throw redirect(302, `${fallbackUrl.pathname}?limit=${limit}`);
    }
}
