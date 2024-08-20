import { ReactNode } from "react";

export interface PostBoxContainerType {
    children: ReactNode;
    username: string;
    title: string;
    postcontent: string;
    postdate: string;
}