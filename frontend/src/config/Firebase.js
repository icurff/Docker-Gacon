// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6nqDIAxop4w4KMpCQW1w8qQlxam_HXH0",
  authDomain: "bookstore-6d244.firebaseapp.com",
  projectId: "bookstore-6d244",
  storageBucket: "bookstore-6d244.appspot.com",
  messagingSenderId: "1079719975785",
  appId: "1:1079719975785:web:de1b44c55af5d93fcb7bf8",
  measurementId: "G-GZHVCCLXG1",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const booksRef = ref(storage, "books");
const usersRef = ref(storage, "users");

export { booksRef };

export async function uploadToFirebase(file, fileName) {
  if (file) {
    try {
      const fileRef = ref(booksRef, fileName);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      throw error;
    }
  } else {
    console.error("No file selected");
  }
}
export async function uploadAvatar(file, fileName) {
  if (file) {
    try {
      const fileRef = ref(usersRef, fileName);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      throw error;
    }
  } else {
    console.error("No file selected");
  }
}
