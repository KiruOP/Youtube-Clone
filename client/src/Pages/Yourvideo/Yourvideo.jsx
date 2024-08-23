import React from 'react';
import "./Yourvideo.css";
import Showvideogrid from '../../Component/Showvideogrid/Showvideogrid';
import Leftsidebar from '../../Component/Leftsidebar/Leftsidebar';
import { useSelector } from 'react-redux';

const Yourvideo = () => {
    const currentuser = useSelector(state => state.currentuserreducer);
    const yourvideolist = useSelector(s => s.videoreducer)?.data?.filter(q => q.videochanel === currentuser?.result._id).reverse();

    return (
        <div className="container_Pages_App">
            <Leftsidebar />
            <div className="container2_Pages_App">
                <div className="container_yourvideo">
                    <h1>Your Video</h1>
                    {currentuser ? (
                        <>
                            <Showvideogrid vid={yourvideolist} />
                        </>
                    ) : (
                        <>
                            <h3>PLZ Login to see Your upload video list</h3>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Yourvideo;