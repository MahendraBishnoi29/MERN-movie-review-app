import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { getMovies } from "../../api/movie/movie";

export const MovieContext = createContext();
const limit = 5;
let currentPageNo = 0;

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);

  // FETCH MOVIES
  const fetchMovies = async (pageNo = currentPageNo) => {
    const { movies, error } = await getMovies(pageNo, limit);
    if (error) return toast.error(error.message);

    if (!movies?.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setMovies([...movies]);
  };

  // FETCH LATEST UPLOADS
  const fetchLatestUploads = async (qty = 5) => {
    const { error, movies } = await getMovies(0, qty);
    if (error) return toast.error(error);
    setLatestUploads([...movies]);
  };

  // Next Page
  const fetchNextPage = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };

  // Prev Page
  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        latestUploads,
        fetchLatestUploads,
        fetchMovies,
        fetchNextPage,
        fetchPrevPage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MoviesProvider;
