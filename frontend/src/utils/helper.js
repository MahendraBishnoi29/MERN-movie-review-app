/* eslint-disable no-useless-escape */
export const isValidEmail = (email) => {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return isValid.test(email);
};

export const getToken = () => localStorage.getItem("auth-token");

// RENDER ACTOR PROFILE
export const renderItem = (result) => {
  return (
    <div key={result?.id} className="flex space-x-2 rounded overflow-hidden">
      <img src={result?.avatar} alt="" className="w-14 h-14 object-cover" />
      <p className="dark:text-white font-semibold">{result?.name}</p>
    </div>
  );
};
