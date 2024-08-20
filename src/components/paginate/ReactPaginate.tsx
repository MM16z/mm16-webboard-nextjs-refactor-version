'use client'

import { FixWithoutRounding } from '@/utils/FixWithoutRounding'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import ReactPaginate from "react-paginate";

export default function ReactPaginateComponent({ postCount }: any) {
    let postsCount = postCount / 6;
    if (postsCount < 1) {
        postsCount = 1;
    }

    const router = useRouter();
    let currentPage = 0;

    const pagginationHandler = (page: any) => {
        const selectedPage = page.selected + 1;
        currentPage = Math.round(selectedPage);

        router.push(`?page=${currentPage}`);
    };

    return (
        <ReactPaginate
            className="paginate"
            breakLabel="..."
            nextLabel="next>"
            // initialPage={Number(param)}
            forcePage={currentPage}
            pageCount={
                Number.isSafeInteger(postsCount)
                    ? Number(postsCount.toFixed(0))
                    : Number(FixWithoutRounding(postsCount, 0)) + 1
            }
            onPageChange={pagginationHandler}
            pageRangeDisplayed={3}
            previousLabel="<previous"
        />
    )
}
