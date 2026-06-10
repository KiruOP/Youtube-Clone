import React from 'react';
import Describechannel from './Describechannel';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ShowVideoGrid from '../../components/ShowVideoGrid/ShowVideoGrid';
import { useParams } from 'react-router-dom';
import useVideos from '../../components/hooks/useVideos';

const Channel = ({ seteditcreatechanelbtn, setvideouploadpage }) => {
  const { cid } = useParams();
  const { videos } = useVideos();
  const vids = videos.filter(q => q?.videochanel === cid).reverse();

  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <Describechannel cid={cid} setvideouploadpage={setvideouploadpage} seteditcreatechanelbtn={seteditcreatechanelbtn} />
        <ShowVideoGrid vids={vids} />
      </div>
    </div>
  );
};

export default Channel;