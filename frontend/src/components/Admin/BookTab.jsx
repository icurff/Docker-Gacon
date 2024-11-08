import { useState } from "react";
import { useFetchBooks } from "../../customHooks/Book/useFetchBooks";
import { Table, Pagination, Button, Select, TextInput } from "flowbite-react";
import { EditBookModal } from "./EditBookModal";
import { AddBookModal } from "./AddBookModal";
import { FormatNumber } from "../../utils/FormatNumber";

export function BookTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  // Fetch books with search query, category, and price range
  const { data } = useFetchBooks(
    currentPage,
    category,
    priceRange,
    searchQuery,
  );

  const books = data?.data || [];
  const totalPages = data?.last_page || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleFilterChange(); // Reset page to 1 when search changes
  };

  const handleEditClick = (book) => {
    setBookToEdit(book);
    setIsEditFormOpen(true);
  };

  const handleAddClick = () => {
    setIsAddFormOpen(true);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Add Button and Filters */}
      <div className="mb-4 flex items-center justify-between">
        {/* Add Book Button */}
        <Button onClick={handleAddClick}>Add Book</Button>

        {/* Search Form */}
        <div className="mx-8 flex-grow">
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

      {/* Table and Pagination */}
      <div className="overflow-x-auto">
        <Table hoverable className="min-w-full">
          <Table.Head>
            <Table.HeadCell>Book Name</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Author</Table.HeadCell>
            <Table.HeadCell>Publisher</Table.HeadCell>
            <Table.HeadCell>Pages</Table.HeadCell>
            <Table.HeadCell>Language</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Thumbnail</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {books.map((book) => (
              <Table.Row
                key={book.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-medium text-gray-900 dark:text-white">
                  {book.title}
                </Table.Cell>
                <Table.Cell>{FormatNumber(book.price)}</Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.publisher}</Table.Cell>
                <Table.Cell>{book.pages}</Table.Cell>
                <Table.Cell>{book.language}</Table.Cell>
                <Table.Cell>{book.category}</Table.Cell>
                <Table.Cell>
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="h-16 w-16 object-cover"
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEditClick(book)}>Edit</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="mt-4">
          <Pagination
            className="flex justify-center"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Add Book Form */}
      <AddBookModal
        show={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
      />
      {/* Edit Book Form */}
      <EditBookModal
        show={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        book={bookToEdit}
      />
    </div>
  );
}
