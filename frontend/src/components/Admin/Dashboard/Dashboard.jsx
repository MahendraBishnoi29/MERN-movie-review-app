import AppInfoBox from "../../Shared/AppInfoBox";
import LatestUpload from "../../Shared/LatestUpload";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-5 my-5 p-5">
      <AppInfoBox title="Total Uploads" subtitle="100" />
      <AppInfoBox title="Total Reviews" subtitle="100" />
      <AppInfoBox title="Total Users" subtitle="50" />

      <LatestUpload />
    </div>
  );
};

export default Dashboard;
