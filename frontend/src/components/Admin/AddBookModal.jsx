import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Select,
  FileInput,
} from "flowbite-react";
import { useState } from "react";
import { uploadToFirebase } from "../../config/Firebase";
import { useAddBookMutation } from "../../customHooks/Book/useAddBookMutation";
import { useUpdateBookMutation } from "../../customHooks/Book/useUpdateBookMutation";
import { toast } from "react-toastify";
export function AddBookModal({ show, onClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [publisher, setPublisher] = useState("");
  const [pages, setPages] = useState("");
  const [language, setLanguage] = useState("Vietnamese");
  const [category, setCategory] = useState("Miscellaneous");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [file, setFile] = useState(null);
  const [availability, setAvailability] = useState(1);
  const { mutateAsync: addBook } = useAddBookMutation();
  const { mutateAsync: updateBook } = useUpdateBookMutation();

  const handleSave = async () => {
    try {
      const data = await addBook({
        title,
        author,
        price,
        publisher,
        pages,
        language,
        category,
        description,
        availability,
      });
      if (file) {
        const folderPath = `${data.book.id}.${data.book.title}/${file.name}`;
        const thumbnailURL = await uploadToFirebase(file, folderPath);
        await updateBook([data.book.id, { thumbnail: thumbnailURL }]);
      }
      onClose();
      clearState();
      toast.success("Book added successfully");
    } catch (error) {
      toast.error(`Error during the save process: ${error.message}`);
    }
  };

  function clearState() {
    setTitle("");
    setAuthor("");
    setPrice("");
    setPublisher("");
    setPages("");
    setLanguage("Vietnamese");
    setCategory("Miscellaneous");
    setDescription("");
    setThumbnail("");
    setFile(null);
    setAvailability(1);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setThumbnail(reader.result);
      };
      setFile(file);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Add New Book</Modal.Header>
      <Modal.Body>
        <form className="dark:text-white">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Book Title</label>
            <TextInput
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Price</label>
            <TextInput
              type="number"
              placeholder="Enter book price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Author</label>
            <TextInput
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Publisher</label>
            <TextInput
              type="text"
              placeholder="Enter publisher name"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Pages</label>
            <TextInput
              type="number"
              placeholder="Enter number of pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Availability
            </label>
            <TextInput
              type="number"
              placeholder="Enter availability number"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Language</label>
            <Select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            >
              <option value="Vietnamese">Vietnamese</option>
              <option value="English">English</option>
            </Select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Category</label>
            <Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="Miscellaneous">Miscellaneous</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Children">Children</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
            </Select>
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>
            <Textarea
              placeholder="Enter book description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Thumbnail</label>
            <FileInput
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="mt-2 h-16 w-16 object-cover"
              />
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="bg-[#f2f3f4] text-black"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
