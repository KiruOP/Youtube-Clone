import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { setcurrentuser } from '../../actions/currentuser';
import { googleLogout } from '@react-oauth/google';

const useAuth = () => {
    const dispatch = useDispatch();
    const currentuser = useSelector((state) => state.currentuserreducer);

    const loginUser = (authdata) => {
        dispatch(login(authdata));
    };

    const logoutUser = () => {
        dispatch(setcurrentuser(null));
        googleLogout();
        localStorage.clear();
    };

    const loadUserFromStorage = () => {
        const profile = localStorage.getItem('Profile');
        if (profile) {
            dispatch(setcurrentuser(JSON.parse(profile)));
        }
    };

    return {
        currentuser,
        loginUser,
        logoutUser,
        loadUserFromStorage,
    };
};

export default useAuth;
