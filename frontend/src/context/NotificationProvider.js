import React, { createContext } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const updateNotification = () => {};

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      <div className="fixed left-1/2 -translate-x-1/2 top-24 ">
        <div className="shadow-md shadow-gray-400 bg-red-500 rounded gelatine">
          <p className="text-white px-4 py-2 font-semibold">
            Something went wrong..
          </p>
        </div>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
