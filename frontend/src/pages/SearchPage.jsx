import { MyNavbar } from "../components/MyNavbar";
import { MyFooter } from "../components/MyFooter";
import { useFetchBooks } from "../customHooks/Book/useFetchBooks";
import { TextInput, Select, Pagination } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MySection } from "../components/MySection";
export function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const customPaginationTheme = {
    base: "",
    layout: {
      table: {
        base: "text-sm text-gray-700 dark:text-gray-400 flex justify-center gap-1",
        span: "font-semibold text-gray-900 dark:text-white",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        active:
          "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchText = searchParams.get("searchText") || "";
    setSearchQuery(searchText);
    setCategory(searchParams.get("category") || "All");
  }, [location.search]);

  const { data } = useFetchBooks(
    currentPage,
    category,
    priceRange,
    searchQuery,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterChange();
  };
  function handleCardClick(cardId) {
    navigate(`/books/${cardId}`);
  }

  const books = data?.data || [];
  const totalPages = data?.last_page || 1;

  return (
    <>
      <MyNavbar />
      <div className="min-h-screen">
        <MySection>
          <div className="flex gap-4">
            {/* Search Form */}
            <div className="flex-grow">
              <form>
                <TextInput
                  type="search"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full"
                  required
                />
              </form>
            </div>
            {/* Category and Price Range Filters */}
            <div className="flex gap-4">
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  handleFilterChange();
                }}
              >
                <option value="All">All Categories</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Children">Children</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
              </Select>

              <Select
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  handleFilterChange();
                }}
              >
                <option value="All">All Price Ranges</option>
                <option value="0-100000">0 - 100.000</option>
                <option value="100000-500000">100.000 - 500.000</option>
                <option value="500000-1000000">500.000 - 1.000.000</option>
                <option value="1000000+">1.000.000+</option>
              </Select>
            </div>
          </div>
          <hr className="my-8 h-px border-0 bg-black"></hr>
          <div>
            {books.map((book) => (
              <div>
                <div
                  key={book.id}
                  className="mt-4 flex gap-4 rounded-xl p-5 hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => handleCardClick(book.id)}
                >
                  <div className="w-1/3 flex-none">
                    <div className="flex items-center justify-center">
                      <img
                        src={book.thumbnail}
                        alt="Thumbnail"
                        className="h-44 w-44 rounded-xl object-cover"
                      />
                    </div>
                  </div>
                  <div className="w-2/3">
                    <div className="flex flex-col justify-center">
                      <h2 className="text-xl font-semibold">{book.title}</h2>
                      <p className="text-md">Author: {book.author}</p>
                      <p className="text-md">Category: {book.category}</p>
                      <p className="text-md">Price: {book.price}</p>
                    </div>
                  </div>
                </div>
                <hr className="my-8 h-px border-0 bg-black"></hr>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Pagination
              theme={customPaginationTheme}
              layout="table"
              className="flex flex-col"
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showIcons
            />
          </div>
        </MySection>
      </div>

      <MyFooter />
    </>
  );
}
