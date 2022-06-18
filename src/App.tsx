import { useEffect, useId, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAuth } from 'firebase/auth';
import LoginRoute from './components/LoginRoute';
import AuthRoute from './components/AuthRoute';
import VideoCard from './components/VideoCard';
import {
  collection,
  doc,
  getDocs,
  deleteDoc,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './config/config';
import { Link } from 'react-router-dom';
import useVideoCollection from './hooks/useVideoCollection';

const videoCollectionRef = collection(db, 'video');

interface IVideoData {
  name: string;
  url: string;
  createdAt: Date;
  id: string;
}

function App() {
  const labelId = useId();
  const [nameValue, setNameValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const user = getAuth().currentUser;
  const { getVideoCollection, videoData, addVideo, deleteVideo } =
    useVideoCollection();
  useEffect(() => {
    getVideoCollection();
  }, []);
  // update video

  const onAdd = () => {
    setNameValue('');
    setUrlValue('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <img src={user?.photoURL || ''} alt="" />
        <div style={{ paddingBottom: 20 }}>{user?.displayName}</div>
        <LoginRoute />

        <div>
          <label htmlFor={`nameInput-${labelId}`}>Name</label>
          <input
            className="text-black"
            id={`nameInput-${labelId}`}
            value={nameValue}
            onChange={e => setNameValue(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor={`urlInput-${labelId}`}>Url</label>
          <input
            className="text-black"
            value={urlValue}
            onChange={e => setUrlValue(e.target.value)}
            id={`urlInput-${labelId}`}
          ></input>
        </div>

        <button onClick={() => addVideo(nameValue, urlValue, onAdd)}>
          add doc
        </button>

        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      <div className="max-w-[895px] mx-auto">
        {videoData.map(data => (
          <VideoCard
            key={data.id}
            data={data}
            deleteVideo={deleteVideo(data.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
