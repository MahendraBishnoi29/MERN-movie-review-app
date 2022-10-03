import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getAppInfo } from "../../../api/admin";
import AppInfoBox from "../../Shared/AppInfoBox";
import LatestUpload from "../../Shared/LatestUpload";
import MostRated from "../../Shared/MostRated";

const Dashboard = () => {
  const [appInfo, setAppInfo] = useState({
    movieCount: 0,
    reviewCount: 0,
    userCount: 0,
  });

  const fetchAppInfo = async () => {
    const { appInfo, error } = await getAppInfo();
    if (error) return toast.error("Error Getting App Info" + error);
    setAppInfo({ ...appInfo });
  };

  useEffect(() => {
    fetchAppInfo();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-5 my-5 p-5">
      <AppInfoBox title="Total Uploads" subtitle={appInfo.movieCount} />
      <AppInfoBox title="Total Reviews" subtitle={appInfo.reviewCount} />
      <AppInfoBox title="Total Users" subtitle={appInfo.userCount} />

      <LatestUpload />
      <MostRated />
    </div>
  );
};

export default Dashboard;
