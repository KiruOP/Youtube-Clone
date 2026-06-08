import React from 'react';
import "./YourVideos.css";
import ShowVideoGrid from '../../components/ShowVideoGrid/ShowVideoGrid';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import SignedOutScreen from '../../components/SignedOutScreen/SignedOutScreen';
import { AiFillPlaySquare } from 'react-icons/ai';
import useAuth from '../../components/hooks/useAuth';
import useVideos from '../../components/hooks/useVideos';

const YourVideos = () => {
    const { currentuser } = useAuth();
    const { videos } = useVideos();
    const yourvideolist = React.useMemo(() => {
        return videos.filter(q => q.videochanel === currentuser?.result?._id).reverse();
    }, [videos, currentuser]);

    if (!currentuser) {
        return (
            <div className="container_Pages_App">
                <LeftSidebar />
                <div className="container2_Pages_App">
                    <SignedOutScreen
                        icon={AiFillPlaySquare}
                        title="Manage your videos"
                        description="Sign in to upload new videos or manage your existing uploads"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="container_Pages_App">
            <LeftSidebar />
            <div className="container2_Pages_App">
                <div className="container_yourvideo">
                    <h1 style={{ fontSize: '24px', fontWeight: '500', color: 'var(--yt-text-primary)', margin: '0 0 20px 0' }}>Your Videos</h1>
                    <ShowVideoGrid vid={yourvideolist} />
                </div>
            </div>
        </div>
    );
};

export default YourVideos;