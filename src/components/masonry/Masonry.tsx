'use client'
import React from 'react'

import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 4,
    1920: 3,
    1500: 2,
    1100: 1,
};

export default function MasonryComponent() {
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            style={{ marginTop: "20px" }}
        >
        </Masonry>
    )
}
