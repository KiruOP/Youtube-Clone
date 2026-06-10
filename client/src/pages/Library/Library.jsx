import React from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import { FaHistory } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import WHLvideolist from '../../components/WHL/WHLvideolist';
import useAuth from '../../components/hooks/useAuth';
import usePlaylists from '../../components/hooks/usePlaylists';
import './Library.css';

const Library = () => {
    const { currentuser } = useAuth();
    const { likedVideos, watchLater, history } = usePlaylists();

    return (
        <div className="container_Pages_App">
            <LeftSidebar />
            <div className='container2_Pages_App'>
                <div className="container_libraryPage">
                    <h1 className="title_container_LibraryPage">
                        <b>
                            <FaHistory />
                        </b>
                        <b>History</b>
                    </h1>
                    <div className="container_videoList_LibraryPage">
                        <WHLvideolist page={"History"} currentuser={currentuser?.result?._id} videolist={{ data: history }} />
                    </div>
                </div>
                <div className="container_libraryPage">
                    <h1 className="title_container_LibraryPage">
                        <b>
                            <MdOutlineWatchLater />
                        </b>
                        <b>Watch later</b>
                    </h1>
                    <div className="container_videoList_LibraryPage">
                        <WHLvideolist page={"Watch Later"} currentuser={currentuser?.result?._id} videolist={{ data: watchLater }} />
                    </div>
                </div>
                <div className="container_libraryPage">
                    <h1 className="title_container_LibraryPage">
                        <b>
                            <AiOutlineLike />
                        </b>
                        <b>Liked Videos</b>
                    </h1>
                    <div className="container_videoList_LibraryPage">
                        <WHLvideolist page={"Liked Videos"} currentuser={currentuser?.result?._id} videolist={{ data: likedVideos }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;