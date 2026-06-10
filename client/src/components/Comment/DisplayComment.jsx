import React, { useState } from 'react';
import './Comment.css';
import moment from 'moment';
import useAuth from '../hooks/useAuth';
import useComments from '../hooks/useComments';

const DisplayComment = ({ cid, commentbody, userid, commenton, usercommented }) => {
    const [edit, setEdit] = useState(false);
    const [cmtnody, setCommentbdy] = useState('');
    const [cmtid, setCmntid] = useState('');
    
    const { currentuser } = useAuth();
    const { updateCommentText, removeComment } = useComments();

    const handleEdit = (ctid, ctbdy) => {
        setEdit(true);
        setCmntid(ctid);
        setCommentbdy(ctbdy);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!cmtnody) {
            alert('Type your comment');
        } else {
            updateCommentText(cmtid, cmtnody);
            setCommentbdy('');
        }
        setEdit(false);
    };

    const handleDelete = (id) => {
        removeComment(id);
    };

    return (
        <div className="comment_item_container">
            <div className="Chanel_logo_App" style={{ width: '32px', height: '32px', marginRight: '12px', flexShrink: 0 }}>
                <div className="fstChar_logo_App" style={{ fontSize: '14px' }}>
                    {usercommented ? usercommented.charAt(0).toUpperCase() : '?'}
                </div>
            </div>
            <div className="comment_item_details">
                <div className="comment_item_header">
                    <span className="comment_author">{usercommented}</span>
                    <span className="comment_time">{moment(commenton).fromNow()}</span>
                </div>
                {edit ? (
                    <form className="comments_sub_form_comments" onSubmit={handleOnSubmit} style={{ marginTop: '8px' }}>
                        <input
                            type="text"
                            onChange={(e) => setCommentbdy(e.target.value)}
                            placeholder="Edit comment..."
                            value={cmtnody}
                            className="comment_ibox"
                            style={{ width: '100%' }}
                        />
                        <div className="comment_action_buttons" style={{ marginTop: '8px' }}>
                            <button
                                type="button"
                                className="comment_cancel_btn"
                                onClick={() => setEdit(false)}
                            >
                                Cancel
                            </button>
                            <input type="submit" value="Save" className="comment_add_btn_comments" />
                        </div>
                    </form>
                ) : (
                    <p className="comment_body">{commentbody}</p>
                )}
                {currentuser?.result?._id === userid && !edit && (
                    <div className="EditDel_DisplayCommendt">
                        <span onClick={() => handleEdit(cid, commentbody)}>Edit</span>
                        <span onClick={() => handleDelete(cid)}>Delete</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DisplayComment;