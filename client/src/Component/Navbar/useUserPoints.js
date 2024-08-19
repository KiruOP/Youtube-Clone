import { useEffect, useState } from "react";

const useUserPoints = (currentUserId) => {
    const [userPointsData, setUserPointsData] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userPointsData")) || [];
        setUserPointsData(storedData);
    }, []);

    const updatePoints = () => {
        const updatedData = userPointsData.map((user) => {
            if (user.userId === currentUserId) {
                return {
                    ...user,
                    points: user.points + 5,
                    videosWatched: user.videosWatched + 1,
                };
            }
            return user;
        });

        const userExists = updatedData.some(
            (user) => user.userId === currentUserId
        );

        if (!userExists) {
            updatedData.push({
                userId: currentUserId,
                points: 5,
                videosWatched: 1,
            });
        }

        setUserPointsData(updatedData);
        localStorage.setItem("userPointsData", JSON.stringify(updatedData));
    };

    const getUserData = () => {
        return (
            userPointsData.find((user) => user.userId === currentUserId) || {
                points: 0,
                videosWatched: 0,
            }
        );
    };

    return { updatePoints, getUserData };
};

export default useUserPoints;
