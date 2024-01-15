import React, { useState, useRef } from 'react';
import { uploadToIPFS } from './utils/ipfs.js';
import './FileUpload.css';

const FileUpload = ({ onFileUploaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('No selected file'); // state to hold the selected file name
  const [receiverAddress, setReceiverAddress] = useState('');
  const fileInputRef = useRef(); // To create a reference to the input element

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name); // Update filename when file is selected
    } else {
      setFileName('No selected File'); // Restore default text when file selection is canceled
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const ipfsLink = await uploadToIPFS(selectedFile);
      onFileUploaded(ipfsLink, receiverAddress);
    }
  };

  const triggerFileInput = () => {
    
    fileInputRef.current.click();
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        ref={fileInputRef}
        className="file-input"
        onChange={handleFileChange}
        style={{ display: 'none' }} 
      />
      <button className="file-select-btn" onClick={triggerFileInput}>
        Select File
      </button>
      <span className="file-name">{fileName}</span>
      <input
        type="text"
        className="receiver-input"
        value={receiverAddress}
        onChange={e => setReceiverAddress(e.target.value)}
        placeholder="Receiver Address"
      />
      <button className="upload-btn" onClick={handleUpload}>
        Upload File
      </button>
    </div>
  );
};

export default FileUpload;
