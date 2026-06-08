import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./Home.css";
import ShowVideoGrid from "../../components/ShowVideoGrid/ShowVideoGrid";
import useVideos from "../../components/hooks/useVideos";
import useAuth from "../../components/hooks/useAuth";

const Home = () => {
  const { videos } = useVideos();
  const { currentuser } = useAuth();
  const [activeChip, setActiveChip] = React.useState("All");

  const navlist = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy",
  ];

  const filteredVids = React.useMemo(() => {
    let list = [...videos].reverse();
    if (activeChip !== "All") {
      list = list.filter((v) =>
        v.videotitle?.toLowerCase().includes(activeChip.toLowerCase())
      );
    }
    return list;
  }, [videos, activeChip]);

  return (
    <div className="container_Pages_App">
      <LeftSidebar />
      <div className="container2_Pages_App">
        {currentuser && (
          <div className="navigation_Home">
            {navlist.map((m) => (
              <p
                key={m}
                className={`btn_nav_home ${activeChip === m ? "active" : ""}`}
                onClick={() => setActiveChip(m)}
              >
                {m}
              </p>
            ))}
          </div>
        )}
        <ShowVideoGrid vid={filteredVids} />
      </div>
    </div>
  );
};

export default Home;
