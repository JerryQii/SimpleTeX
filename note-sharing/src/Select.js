import React, { useState } from 'react';
import Modal from './components/select-modal';
import Modalt from './components/select-modalagain';
import './Select.css';
import firestore from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore'; 
//import './App.css';
//import Landing from './components/landing-page.js';

function Select() {
  const [showModal, setShowModal] = useState(false);
  const [showNotesList, setNotesList] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenNotes = () => setNotesList(true);
  const handleCloseNotes = () => setNotesList(false);

  const handleCreate = async (title) => {
    try {
      // Reference to 'texts' collection in Firestore
      const textsCollectionRef = collection(firestore, "docs");
      // Add a new document to the collection
      await addDoc(textsCollectionRef, { 
        title: title,
        content: ""
       });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const handleLoad = async (title) => {
    try {
      // Reference to 'texts' collection in Firestore
      const textsCollectionRef = collection(firestore, title);
      // Add a new document to the collection
      await addDoc(textsCollectionRef, { 
        content: ""
       });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  return (
    <div className="SelectScreen">
      <div className="text-container">
        <p>Load Note</p>
      </div>
      <div className="button-container">
        <button onClick={handleOpenNotes}>Load from File</button>
        <button onClick={handleOpenModal}>New File</button>
      </div>
      <Modal show={showModal} onClose={handleCloseModal} submit={handleCreate}>
        <p>Please enter a title:</p>
      </Modal>
      <Modal show={showNotesList} onClose={handleCloseNotes} submit={handleLoad}>
        <p>Please Select</p>
      </Modal>
    </div>
  );
}

export default Select;