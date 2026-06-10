import React from 'react'
import Showvideolist from '../ShowVideoList/ShowVideoList'
const WHLvideolist = ({ page, currentuser, videolist }) => {
    return (
        <div className="Container_ShowVideoGrid" style={{ padding: '0' }}>
            {currentuser ? (
                <>
                    {
                        videolist?.data.filter(q => q?.viewer === currentuser).reverse().map(m => {
                            return (
                                <Showvideolist videoid={m?.videoid} key={m?._id}/>
                            )
                        })
                    }

                </>
            ) : (
                <h2 style={{ color: "white" }}>Plz login to Watch your {page}</h2>
            )}
        </div>
    )
}

export default WHLvideolist