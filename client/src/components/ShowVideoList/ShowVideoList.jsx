import React from "react";
import Showvideo from "../ShowVideo/ShowVideo";
import useVideos from "../hooks/useVideos";

const ShowVideoList = ({ videoid }) => {
    const { videos } = useVideos();
    return (
        <>
            {
                videos.filter(q => q._id === videoid).map(vi => {
                    return (
                        <div className="video_box_app" key={vi._id}>
                            <Showvideo vid={vi} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default ShowVideoList;