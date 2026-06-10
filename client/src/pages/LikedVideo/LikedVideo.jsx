import React from 'react';
import WHL from '../../components/WHL/WHL';
import usePlaylists from '../../components/hooks/usePlaylists';

const LikedVideo = () => {
  const { likedVideos } = usePlaylists();
  return (
    <WHL page={"Liked Video"} videolist={{ data: likedVideos }} />
  )
}

export default LikedVideo;