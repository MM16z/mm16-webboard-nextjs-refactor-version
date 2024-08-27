'use client';

import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { homepageApiService } from "@/api/homepageService";
import { useAppSelector } from "@/redux/hook";

type HeartBtnPropsType = {
    postLikedCount: number;
    defaultChecked: boolean;
    disabled?: boolean;
    postId: number
};

const DEBOUNCE_DELAY = 1500;

const HeartBtn = (props: HeartBtnPropsType) => {
    const { postId } = props
    const userId = useAppSelector(state => state.userSlice.currentUser.userId)

    const [postLikedCount, setPostLikedCount] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const onPostLikeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.defaultChecked = event.target.checked
        try {
            if (event.target.checked) {
                homepageApiService.updatePostLike(postId, "like").then(_ => {
                    setPostLikedCount(prev => prev + 1)
                }).catch(_ => {
                    setPostLikedCount(prev => prev - 1)
                })
            } else {
                homepageApiService.updatePostLike(postId, "unlike").then(_ => {
                    setPostLikedCount(prev => prev - 1)
                }).catch(_ => {
                    setPostLikedCount(prev => prev + 1)
                })
            }
            setIsButtonDisabled(true);
            setTimeout(() => {
                setIsButtonDisabled(false);
            }, DEBOUNCE_DELAY);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setPostLikedCount(props.postLikedCount)
    }, [props.postLikedCount])

    return (
        <div className="heartbtn-warpper">
            <div className="postlikecount">{postLikedCount}</div>
            <input
                type="checkbox"
                id="checkbox"
                onChange={onPostLikeHandler}
                defaultChecked={props.defaultChecked}
                disabled={isButtonDisabled}
                style={{ cursor: isButtonDisabled ? "none" : "pointer" }}
            />
            <label htmlFor="checkbox">
                <noscript>By http://robeen.io</noscript>
                <svg
                    style={{ opacity: isButtonDisabled ? "0.5" : "1" }}
                    id="heart-svg"
                    viewBox="467 392 58 57"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        id="Group"
                        fill="none"
                        fillRule="evenodd"
                        transform="translate(467 392)"
                    >
                        <path
                            d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                            id="heart"
                            fill="#AAB8C2"
                        />
                        <circle
                            id="main-circ"
                            fill="#E2264D"
                            opacity={0}
                            cx="29.5"
                            cy="29.5"
                            r="1.5"
                        />
                        <g id="grp7" opacity={0} transform="translate(7 6)">
                            <circle id="oval1" fill="#9CD8C3" cx={2} cy={6} r={2} />
                            <circle id="oval2" fill="#8CE8C3" cx={5} cy={2} r={2} />
                        </g>
                        <g id="grp6" opacity={0} transform="translate(0 28)">
                            <circle id="oval1" fill="#CC8EF5" cx={2} cy={7} r={2} />
                            <circle id="oval2" fill="#91D2FA" cx={3} cy={2} r={2} />
                        </g>
                        <g id="grp3" opacity={0} transform="translate(52 28)">
                            <circle id="oval2" fill="#9CD8C3" cx={2} cy={7} r={2} />
                            <circle id="oval1" fill="#8CE8C3" cx={4} cy={2} r={2} />
                        </g>
                        <g id="grp2" opacity={0} transform="translate(44 6)">
                            <circle id="oval2" fill="#CC8EF5" cx={5} cy={6} r={2} />
                            <circle id="oval1" fill="#CC8EF5" cx={2} cy={2} r={2} />
                        </g>
                        <g id="grp5" opacity={0} transform="translate(14 50)">
                            <circle id="oval1" fill="#91D2FA" cx={6} cy={5} r={2} />
                            <circle id="oval2" fill="#91D2FA" cx={2} cy={2} r={2} />
                        </g>
                        <g id="grp4" opacity={0} transform="translate(35 50)">
                            <circle id="oval1" fill="#F48EA7" cx={6} cy={5} r={2} />
                            <circle id="oval2" fill="#F48EA7" cx={2} cy={2} r={2} />
                        </g>
                        <g id="grp1" opacity={0} transform="translate(24)">
                            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy={3} r={2} />
                            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy={2} r={2} />
                        </g>
                    </g>
                </svg>
            </label>
        </div>
    );
};
HeartBtn.displayName = "HeartBtn";

export default HeartBtn;
