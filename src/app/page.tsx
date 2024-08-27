import PostBoxContainer from "@/components/post-box/PostBox";
import { homepageApiService } from "../api/homepageService";
import MasonryComponent from "../components/masonry/Masonry";
import { silkscreen, verela } from "../fonts/fonts";
import dayjs from "dayjs";
import ReactPaginateComponent from "@/components/paginate/ReactPaginate";
import HeartBtn from "@/components/heart-btn/HeartBtn";
import CommentBoxContainer from "@/components/post-box/CommentBox";
import { cookies } from "next/headers";
import CommentForm from "@/components/(pages)/homepage/commentForm";

export const fetchCache = 'force-no-store'

export default async function HomePage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cookiesStore = cookies();
  const userId = cookiesStore.get('u_id')?.value;

  const page = Math.max(0, Number(searchParams?.page || 0) - 1);
  const data = await homepageApiService.getAllPosts({ offset: page * 6 }, userId);

  return (
    <main className={`${silkscreen.className} overflow-x-hidden`}>
      <div id="home-page-bg">
        <span id="home-page-bg-nested"></span>
      </div>
      <h2 className={`${verela.className} text-center pt-4 text-2xl`}>Register with any non-existing email to post, comment, or like.<br />
        <span>or try an global account? email/user=<span className="font-bold">admin</span> password=<span className="font-bold">1234</span></span></h2>
      {/* Masonry component */}
      <div className="masonry-warper mt-4">
        <MasonryComponent>
          {
            (() => {
              const posts = data.allPosts || [];
              const emptyPosts = Array(Math.max(0, 6 - posts.length)).fill({});
              return [...posts, ...emptyPosts].map((post: any, index: number) => {
                if (Object.keys(post).length === 0) {
                  return <div key={`empty-${index}`} style={{ width: '400px', height: '0px' }}></div>;
                }
                const postId = post.id;
                const postTitle = post.post_title;
                const postContent = post.post_content;
                const postUsername = post.post_username;
                const postCreatedAt = post.created_at;
                return (
                  <PostBoxContainer
                    key={postId}
                    username={postUsername}
                    title={postTitle}
                    postcontent={postContent}
                    postdate={dayjs(postCreatedAt).format("D MMM YYYY - HH:mm")}
                  >
                    <HeartBtn
                      key={postId}
                      postLikedCount={post.post_liked_count}
                      defaultChecked={post.isLiked}
                      postId={postId}
                      disabled={false}
                    />
                    <CommentForm postId={postId} />
                    {post?.comments?.map((comment: any, index: any) => {
                      const commentId = comment.id;
                      const commentContent = comment.comment_content;
                      const commentUsername = comment.user.username;
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
                            commentusername={commentUsername}
                            commentcontent={commentContent}
                            commentId={commentId}
                            commentUserId={comment.user.id}
                          />
                        );
                      }
                    })}
                  </PostBoxContainer>
                );
              })
            })()
          }

        </MasonryComponent>
      </div>
      <ReactPaginateComponent postCount={data.postsCount} currentPageProps={page} />

    </main>
  );
}
