import React from 'react';
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar';
import { FaHistory } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import WHLvideolist from '../../Component/WHL/WHLvideolist';
import { useSelector } from 'react-redux';
import './Library.css';

const Library = () => {
    const currentuser = useSelector(state => state.currentuserreducer);
    const likedvideolist = useSelector((state) => state.likedvideoreducer);
    const watchlatervideolist = useSelector((s) => s.watchlaterreducer);
    const watchhistoryvideolist = useSelector(s => s.historyreducer);

    return (
        <div className="container_Pages_App">
            <Leftsidebar />
            <div className='container2_Pages_App'>
                <div className="container_libraryPage">
                    <h1 className="title_container_LibraryPage">
                        <b>
                            <FaHistory />
                        </b>
                        <b>History</b>
                    </h1>
                    <div className="container_videoList_LibraryPage">
                        <WHLvideolist page={"History"} currentuser={currentuser?.result?._id} videolist={watchhistoryvideolist} />
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
                        <WHLvideolist page={"Watch Later"} currentuser={currentuser?.result?._id} videolist={watchlatervideolist} />
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
                        <WHLvideolist page={"Liked Videos"} currentuser={currentuser?.result?._id} videolist={likedvideolist} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;