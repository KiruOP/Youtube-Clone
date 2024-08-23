import React from 'react';
import WHL from '../../Component/WHL/WHL';
import { useSelector } from 'react-redux';

const Watchhistory = () => {
  const watchhistoryvideolist = useSelector(s => s.historyreducer);
  return (
    <WHL page={"History"} videolist={watchhistoryvideolist} />
  )
}

export default Watchhistory;