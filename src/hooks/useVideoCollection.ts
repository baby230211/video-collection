import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../config/config';

interface IVideoData {
  name: string;
  url: string;
  createdAt: Date;
  id: string;
}
const videoCollectionRef = collection(db, 'video');

const useVideoCollection = () => {
  const [videoData, setVideoData] = useState<IVideoData[]>([]);

  const getVideoCollection = async () => {
    return getDocs(query(videoCollectionRef, orderBy('createdAt', 'desc')))
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
  };

  const addVideo = async (
    nameValue: string,
    urlValue: string,
    onAdd: () => void
  ) => {
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
        onAdd();
      })
      .catch(error => console.error(error));
  };

  const deleteVideo =
    (id: string) =>
    async (onDelete = () => {}) => {
      console.log(onDelete);
      if (!id) {
        return;
      }
      return deleteDoc(doc(db, 'video', id)).then(res => {
        if (onDelete) {
          onDelete();
        }
        setVideoData(prev => prev.filter(item => item.id !== id));
      });
    };

  return { getVideoCollection, videoData, addVideo, deleteVideo };
};

export default useVideoCollection;
