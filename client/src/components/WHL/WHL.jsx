import React from 'react';
import Leftsidebar from '../LeftSidebar/LeftSidebar';
import "./WHL.css";
import WHLvideolist from "./WHLvideolist";
import SignedOutScreen from '../SignedOutScreen/SignedOutScreen';
import { FaHistory, FaTrash, FaPause } from 'react-icons/fa';
import { AiFillLike } from 'react-icons/ai';
import { MdOutlineWatchLater } from 'react-icons/md';
import useAuth from '../hooks/useAuth';
import usePlaylists from '../hooks/usePlaylists';

const WHL = ({ page, videolist }) => {
    const { currentuser } = useAuth();
    const { clearHistoryLogs } = usePlaylists();
    
    const handleclearhistory = () => {
        if (currentuser) {
            clearHistoryLogs(currentuser?.result?._id);
        }
    };

    if (!currentuser) {
        if (page === "History") {
            return (
                <div className="container_Pages_App">
                    <Leftsidebar />
                    <div className="container2_Pages_App">
                        <div className="conatiner_whl" style={{ height: 'calc(100vh - 120px)' }}>
                            <div className="history_signed_out_content" style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <SignedOutScreen
                                    icon={FaHistory}
                                    title="Keep track of what you watch"
                                    description="Watch history isn't viewable when you're signed out. Learn more"
                                />
                            </div>
                            <div className="history_options_sidebar" style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '20px', padding: '24px', borderLeft: '1px solid var(--yt-border)', color: 'var(--yt-text-primary)', height: '100%', boxSizing: 'border-box' }}>
                                <div className="history_option_item" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
                                    <FaTrash size={16} />
                                    <span>Clear all watch history</span>
                                </div>
                                <div className="history_option_item" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
                                    <FaPause size={16} />
                                    <span>Pause watch history</span>
                                </div>
                                <div className="history_option_item" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
                                    <FaTrash size={16} />
                                    <span>Clear all search history</span>
                                </div>
                                <div className="history_option_item" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px' }}>
                                    <FaPause size={16} />
                                    <span>Pause search history</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container_Pages_App">
                    <Leftsidebar />
                    <div className="container2_Pages_App">
                        <SignedOutScreen
                            icon={page === "Liked Video" ? AiFillLike : MdOutlineWatchLater}
                            title={page === "Liked Video" ? "Like videos, playlists, and uploads" : "Enjoy your favorite videos"}
                            description={page === "Liked Video" ? "Playlists and videos you like or save will show here." : "Videos you save for later will appear here."}
                        />
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="container_Pages_App">
            <Leftsidebar />
            <div className="container2_Pages_App">
                <div className="conatiner_whl">
                    <div className="box_WHL leftside_whl">
                        <b>Your {page}</b>
                        <p style={{ margin: '8px 0 0 0', color: 'var(--yt-text-secondary)', fontSize: '14px' }}>Videos you liked or watched will be saved here.</p>
                        {
                            page === "History" &&
                            <div className="clear_History_btn" onClick={() => handleclearhistory()}>Clear History</div>
                        }
                    </div>
                    <div className="rightSide_whl">
                        <h1>{page}</h1>
                        <div className="whl_list">
                            <WHLvideolist page={page} currentuser={currentuser?.result?._id} videolist={videolist} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WHL;