import React, { useState } from "react";
import "./Comment.css";
import DisplayComment from "./DisplayComment";
import useAuth from "../hooks/useAuth";
import useComments from "../hooks/useComments";

const Comment = ({ videoid }) => {
    const { currentuser } = useAuth();
    const { comments, addComment } = useComments();
    const [commenttext, setcommentext] = useState("");

    const handleonsubmit = (e) => {
        e.preventDefault();
        if (currentuser) {
            if (!commenttext) {
                alert("please type your comment!!");
            } else {
                addComment({
                    videoid: videoid,
                    userid: currentuser?.result._id,
                    commentbody: commenttext,
                    usercommented: currentuser.result.name,
                });
                setcommentext("");
            }
        } else {
            alert("Please login to comment");
        }
    };

  return (
    <>
      <div className="comment_form_wrapper">
        <div className="Chanel_logo_App">
          <div className="fstChar_logo_App">
            {currentuser?.result?.name ? (
              <>{currentuser?.result?.name.charAt(0).toUpperCase()}</>
            ) : currentuser?.result?.email ? (
              <>{currentuser?.result?.email.charAt(0).toUpperCase()}</>
            ) : (
              <>?</>
            )}
          </div>
        </div>
        <form className="comments_sub_form_comments" onSubmit={handleonsubmit}>
          <input
            type="text"
            onChange={(e) => setcommentext(e.target.value)}
            placeholder="Add a comment..."
            value={commenttext}
            className="comment_ibox"
          />
          <div className="comment_action_buttons">
            <button
              type="button"
              className="comment_cancel_btn"
              onClick={() => setcommentext("")}
            >
              Cancel
            </button>
            <input type="submit" value="Comment" className="comment_add_btn_comments" />
          </div>
        </form>
      </div>
            <div className="display_comment_container">
                {comments
                    ?.filter((q) => videoid === q?.videoid)
                    .reverse()
                    .map((m) => {
                        return (
                            <DisplayComment
                                key={m._id}
                                cid={m._id}
                                userid={m.userid}
                                commentbody={m.commentbody}
                                commenton={m.commenton}
                                usercommented={m.usercommented}
                            />
                        );
                    })}
            </div>
        </>
    );
};

export default Comment;
