import { create } from 'ipfs-http-client';


const ipfs = create({
  host: 'localhost',
  port: 5001,
  protocol: 'http'
});

export const uploadToIPFS = async (file) => {
  try {
    const added = await ipfs.add(file);
    const url = `https://ipfs.io/ipfs/${added.path}`;
    return url;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    return null;
  }
};