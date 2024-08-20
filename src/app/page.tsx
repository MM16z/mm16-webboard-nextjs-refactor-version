import "@/styles/post-box/post-box.css";
import "@/styles/post-box/comment-box.css";
import "@/styles/heart-btn/heart-btn.css";

import PostBoxContainer from "@/components/post-box/PostBox";
import { homepageApiService } from "../api/homepageService";
import MasonryComponent from "../components/masonry/Masonry";
import { silkscreen, verela } from "./fonts";
import dayjs from "dayjs";
import ReactPaginateComponent from "@/components/paginate/ReactPaginate";
import HeartBtn from "@/components/heart-btn/HeartBtn";
import CommentBoxContainer from "@/components/post-box/CommentBox";
import { useAppSelector } from "@/redux/hook";

export const fetchCache = 'force-no-store'

export default async function HomePage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Math.max(0, Number(searchParams?.page || 0) - 1);
  const data = await homepageApiService.getAllPosts({ offset: page * 6 });

  return (
    <main className={`${silkscreen.className}`}>
      <h2 className={`${verela.className} text-center pt-4 text-2xl`}>Register with any non-existing email to post, comment, or like.<br />
        <span>or try an global account? email/user=admin password=1234</span></h2>
      {/* Masonry component */}
      <div className="masonry-warper mt-4">
        <MasonryComponent>
          {
            data.allPosts?.map((post: any, index: number) => {
              return (
                <PostBoxContainer
                  key={post.post_id}
                  username={post.post_from}
                  title={post.post_title}
                  postcontent={post.post_content}
                  postdate={dayjs(post?.post_createdat).format("D MMM YYYY - HH:mm")}
                >
                  <HeartBtn
                    key={index}
                    postLikedCount={post.post_liked_count}
                    defaultChecked={post.isLiked}
                    postLikePayload={{ post_id: post.post_id }}
                  />
                  <form
                  >
                    <label htmlFor="comment-input">Type something nice :D</label>
                    <textarea
                      key={index}
                      id="comment-input"
                      name="comment"
                      className={`border-[1px] border-gray-400 rounded-lg ${verela.className}`}
                      required
                    ></textarea>
                    <button id="comment-submitbtn" type="submit"
                    >
                      Submit
                    </button>
                  </form>
                  {post?.comments?.map((comment: any, index: any) => {
                    let commentId = comment.comment_id;
                    let commentFrom = comment.comment_from;
                    if (comment.comment_content === null) {
                      return (
                        <div
                          key={index}
                          style={{
                            position: "relative",
                            left: "20px",
                            top: "10px",
                            fontFamily: "Silkscreen, cursive",
                            fontSize: "14px",
                            opacity: "0.8",
                          }}
                        >
                          No comment
                        </div>
                      );
                    } else {
                      return (
                        <CommentBoxContainer
                          key={commentId}
                          commentusername={comment.comment_from}
                          commentcontent={comment.comment_content}
                        />
                      );
                    }
                  })}
                </PostBoxContainer>
              );
            })
          }
        </MasonryComponent>
      </div>
      <ReactPaginateComponent postCount={data.postsCount} />
      <div id="home-page-bg">
        <span id="home-page-bg-nested"></span>
      </div>
    </main>
  );
}
