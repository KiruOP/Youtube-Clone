import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { setcurrentuser } from '../../actions/currentuser';
import { updatechaneldata, fetchallchannel } from '../../actions/channeluser';
import { googleLogout } from '@react-oauth/google';

const useAuth = () => {
    const dispatch = useDispatch();
    const currentuser = useSelector((state) => state.currentuserreducer);
    const channels = useSelector((state) => state.chanelreducer) || [];

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

    const updateChannel = (id, updatedata) => {
        dispatch(updatechaneldata(id, updatedata));
    };

    const fetchChannels = () => {
        dispatch(fetchallchannel());
    };

    return {
        currentuser,
        channels,
        loginUser,
        logoutUser,
        loadUserFromStorage,
        updateChannel,
        fetchChannels,
    };
};

export default useAuth;
