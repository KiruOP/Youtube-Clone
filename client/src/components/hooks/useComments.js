import { useSelector, useDispatch } from 'react-redux';
import { getallcomment, postcomment, editcomment, deletecomment } from '../../actions/comment';

const useComments = () => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.commentreducer)?.data || [];

    const fetchComments = () => {
        dispatch(getallcomment());
    };

    const addComment = (commentData) => {
        dispatch(postcomment(commentData));
    };

    const updateCommentText = (id, commentbody) => {
        dispatch(editcomment({ id, commentbody }));
    };

    const removeComment = (id) => {
        dispatch(deletecomment(id));
    };

    return {
        comments,
        fetchComments,
        addComment,
        updateCommentText,
        removeComment,
    };
};

export default useComments;
