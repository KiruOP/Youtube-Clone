import React from 'react';
import WHL from '../../components/WHL/WHL';
import usePlaylists from '../../components/hooks/usePlaylists';

const WatchHistory = () => {
  const { history } = usePlaylists();
  return (
    <WHL page={"History"} videolist={{ data: history }} />
  )
}

export default WatchHistory;