import { PostBoxContainerType } from "@/models/components/post-boxType";
import { verela } from "@/fonts/fonts";

function PostBoxContainer({ children, ...props }: PostBoxContainerType) {
    const { username, title, postcontent, postdate } = props;

    return (
        <div className="post-box-container">
            <span className="vertical-line"></span>
            <span className="vertical-line_1"></span>
            <span className="horizontal-line"></span>
            <span className="profile-circle-line">
                <span className="profile-circle-img" title="user icons" style={{ scale: 1.2 }}>User icons created by Freepik - Flaticon</span>
            </span>
            <span className="username">{username}</span>
            <span className={`title ${verela.className}`}>{title}</span>
            <span className="line5"></span>
            <span className="line6"></span>
            <span className={`post-content first-line ${verela.className}`}>{postcontent}</span>
            <div
                style={{
                    fontSize: "15px",
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginBottom: "10px",
                    opacity: "0.75",
                    fontFamily: "Silkscreen, cursive",
                }}
            >
                comments
            </div>
            {children}
            <span className={`post-date ${verela.className}`}>{postdate}</span>
            <span className="horizontal-line_1"></span>
        </div>
    );
}

export default PostBoxContainer;
