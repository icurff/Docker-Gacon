import { Modal, Button } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function SearchModal({ show, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    onClose();
    navigate(`/search?searchText=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <Modal show={show} popup onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="rounded-lg border-2">
            <div className="p-3">
              <div className="flex">
                <input
                  className="flex-1 border-0 focus:ring-0"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                />
                <Button onClick={handleSearch} className="flex items-center">
                  <HiSearch />
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
