import Label from "../components/Label/Label";

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

// View All Button
export const ViewAllBtn = ({ visible, children, onClick }) => {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="dark:text-white text-primary hover:underline transition"
    >
      {children}
    </button>
  );
};

//Label With Badge
export const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span className="dark:bg-dark-subtle bg-light-subtle text-white absolute top-0 right-0 w-5 h-5 rounded-full flex justify-center items-center translate-x-2 -translate-y-1 text-sm">
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <div className="relative">
      <Label htmlFor={htmlFor}> {children} </Label>
      {renderBadge()}
    </div>
  );
};

export const getPoster = (posters = []) => {
  const { length } = posters;
  if (!length) return null;

  if (length > 2) return posters[1];

  return posters[0];
};

export const convertReviewCount = (count = 0) => {
  if (count <= 999) return count;
  return parseFloat(count / 1000).toFixed(2) + "k";
};
