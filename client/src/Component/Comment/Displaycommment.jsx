import React, { useState } from 'react';
import './Comment.css';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { editcomment, deletecomment } from '../../action/comment';

const Displaycommment = ({ cid, commentbody, userid, commenton, usercommented }) => {
    const [edit, setEdit] = useState(false);
    const [cmtnody, setCommentbdy] = useState('');
    const [cmtid, setCmntid] = useState('');
    const dispatch = useDispatch();
    const currentuser = useSelector(state => state.currentuserreducer);

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
            dispatch(editcomment({ id: cmtid, commentbody: cmtnody }));
            setCommentbdy('');
        }
        setEdit(false);
    };

    const handleDelete = (id) => {
        dispatch(deletecomment(id));
    };

    return (
        <>
            {edit ? (
                <>
                    <form className="comments_sub_form_commments" onSubmit={handleOnSubmit}>
                        <input
                            type="text"
                            onChange={(e) => setCommentbdy(e.target.value)}
                            placeholder="Edit comments.."
                            value={cmtnody}
                            className="comment_ibox"
                        />
                        <input type="submit" value="Change" className="comment_add_btn_comments" />
                    </form>
                </>
            ) : (
                <p className="comment_body">{commentbody}</p>
            )}
            <p className="usercommented">
                {' '}
                - {usercommented} commented {moment(commenton).fromNow()}
            </p>
            {currentuser?.result?._id === userid && (
                <p className="EditDel_DisplayCommendt">
                    <i onClick={() => handleEdit(cid, commentbody)}>Edit</i>
                    <i onClick={() => handleDelete(cid)}>Delete</i>
                </p>
            )}
        </>
    );
};

export default Displaycommment;