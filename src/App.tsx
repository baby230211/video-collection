import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAuth } from 'firebase/auth';
import LoginRoute from './components/LoginRoute';
import AuthRoute from './components/AuthRoute';

import {
  collection,
  doc,
  getDocs,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './config/config';
import { Link } from 'react-router-dom';

const videoCollectionRef = collection(db, 'video');

interface IVideoData {
  name: string;
  url: string;
  createdAt: Date;
  id: string;
}

function App() {
  const [videoData, setVideoData] = useState<IVideoData[]>([]);

  const [nameValue, setNameValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const user = getAuth().currentUser;

  console.log('auth', user);
  useEffect(() => {
    getDocs(query(videoCollectionRef, orderBy('createdAt', 'desc')))
      .then(res => {
        let data: IVideoData[] = [];
        res.forEach(doc => {
          data.push({
            name: doc.get('name'),
            url: doc.get('url'),
            createdAt: doc.get('createdAt').toDate() as Date,
            id: doc.id,
          });
        });
        setVideoData(data);
      })
      .catch(err => console.error(err));
  }, []);

  // delete video

  // update video

  const addVideo = () => {
    if (!nameValue || !urlValue) return;
    const createdAt = new Date();
    return addDoc(videoCollectionRef, {
      url: urlValue,
      name: nameValue,
      createdAt,
    })
      .then(res => {
        setVideoData(prev => [
          ...prev,
          {
            id: res.id,
            createdAt,
            url: urlValue,
            name: nameValue,
          },
        ]);

        setNameValue('');
        setUrlValue('');
      })
      .catch(error => console.error(error));
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
          <label htmlFor="nameInput">Name</label>
          <input
            id="nameInput"
            value={nameValue}
            onChange={e => setNameValue(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="urlInput">Url</label>
          <input
            value={urlValue}
            onChange={e => setUrlValue(e.target.value)}
            id="urlInput"
          ></input>
        </div>

        <button onClick={addVideo}>add doc</button>
        {videoData.map(data => (
          <div key={data.id}>
            <div>name: {data.name}</div>

            <div>url: {data.url}</div>

            <div>
              createdAt: {data.createdAt.toLocaleDateString()}
              {data.createdAt.toLocaleTimeString()}
            </div>
          </div>
        ))}

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
    </div>
  );
}

export default App;
