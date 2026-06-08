import React from 'react';
import WHL from '../../components/WHL/WHL';
import usePlaylists from '../../components/hooks/usePlaylists';

const WatchLater = () => {
  const { watchLater } = usePlaylists();
  return (
    <WHL page={"Watch Later"} videolist={{ data: watchLater }} />
  )
}

export default WatchLater;