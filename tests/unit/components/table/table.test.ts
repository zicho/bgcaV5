import { getTableParams } from '$lib/components/utils/table/getTableParams';
import { describe, it, expect } from 'vitest';


const testSearchQuery = "test";
const testPageNo = 2;
const testLimit = 50;

describe('table_test', () => {
    it('should_return_query_parameters', async () => {
        const url = new URL(`https://www.test.com?search=${testSearchQuery}&limit=${testLimit}&page=${testPageNo}`);

        const result = getTableParams(url)

        expect(result.searchParam).toBe(testSearchQuery);
        expect(result.limit).toBe(testLimit);
        expect(result.pageNo).toBe(testPageNo);
    });

    it('should_return_search_parameter_and_the_rest_default', async () => {
        const url = new URL(`https://www.test.com?search=${testSearchQuery}`);

        const result = getTableParams(url)

        expect(result.searchParam).toBe(testSearchQuery);
        expect(result.limit).toBe(10);
        expect(result.pageNo).toBe(1);
    });

    it('should_return_limit_parameter_and_the_rest_default', async () => {
        const url = new URL(`https://www.test.com?limit=${testLimit}`);

        const result = getTableParams(url)

        expect(result.searchParam).toBeFalsy();
        expect(result.limit).toBe(testLimit);
        expect(result.pageNo).toBe(1);
    });

    it('should_return_page_parameter_and_the_rest_default', async () => {
        const url = new URL(`https://www.test.com?page=${testPageNo}`);

        const result = getTableParams(url)

        expect(result.searchParam).toBeFalsy();
        expect(result.limit).toBe(10);
        expect(result.pageNo).toBe(2);
    });

    it('should_return_default_limit_on_invalid_limit', async () => {
        // valid limits are 10, 25, 50 and 100
        const url = new URL(`https://www.test.com?limit=${testLimit + 1}`);

        const result = getTableParams(url)
        expect(result.limit).toBe(10);
    });
});
