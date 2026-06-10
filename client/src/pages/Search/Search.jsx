import React from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import ShowVideoGrid from '../../components/ShowVideoGrid/ShowVideoGrid';
import { useParams } from 'react-router-dom';
import useVideos from '../../components/hooks/useVideos';

const Search = () => {
  const { searchquery } = useParams();
  const { videos } = useVideos();
  const vids = videos.filter((q) =>
    q?.videotitle.toUpperCase().includes(searchquery?.toUpperCase())
  );

  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        <ShowVideoGrid vids={vids} />
      </div>
    </div>
  );
};

export default Search;