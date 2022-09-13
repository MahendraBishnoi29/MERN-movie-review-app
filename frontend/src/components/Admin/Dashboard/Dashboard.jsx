const Dashboard = () => {
  return (
    <div className="grid grid-cols-3 gap-5 my-5">
      <div className="bg-white shadow-lg dark:shadow-lg dark:bg-secondary p-5 rounded">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Total Uploads
        </h1>
        <p className="text-xl text-primary dark:text-white">100</p>
      </div>

      <div className="bg-white shadow-lg dark:bg-secondary p-5 rounded">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Total Reviews
        </h1>
        <p className="text-xl text-primary dark:text-white">100</p>
      </div>

      <div className="bg-white shadow-lg dark:bg-secondary p-5 rounded">
        <h1 className="font-semibold text-2xl mb-2 text-primary dark:text-white">
          Total Users
        </h1>
        <p className="text-xl text-primary dark:text-white">100</p>
      </div>
    </div>
  );
};

export default Dashboard;
