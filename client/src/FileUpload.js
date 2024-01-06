import React, { useState } from 'react';
import { uploadToIPFS } from './utils/ipfs.js';

const FileUpload = ({ onFileUploaded }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [receiverAddress, setReceiverAddress] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const ipfsLink = await uploadToIPFS(selectedFile);
      onFileUploaded(ipfsLink, receiverAddress);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <input type="text" value={receiverAddress} onChange={e => setReceiverAddress(e.target.value)} placeholder="Receiver Address" />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;