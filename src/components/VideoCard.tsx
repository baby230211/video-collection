import { getAuth } from 'firebase/auth';
import { collection, getDoc, query, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../config/config';
interface IVideoData {
  name: string;
  url: string;
  createdAt: Date;
  id: string;
}
interface IVideoCard {
  data: IVideoData;
  deleteVideo: () => Promise<void>;
}

function VideoCard({ data, deleteVideo }: IVideoCard) {
  const user = getAuth().currentUser;

  return (
    <div className="w-full border rounded-md mt-5 p-[20px] flex">
      <div className="w-[240px] text-left text-ellipsis overflow-hidden whitespace-nowrap flex-1">
        {data.name}
      </div>
      <a href={data.url} className="text-left mr-5 text-blue-500 underline">
        Link
      </a>
      <div>
        {data.createdAt.toLocaleDateString()}
        {data.createdAt.toLocaleTimeString()}
      </div>
      <button
        onClick={() => {
          if (user?.displayName !== '謝成宥') {
            return;
          }
          deleteVideo();
        }}
        className="ml-5"
      >
        delete button
      </button>
    </div>
  );
}

export default VideoCard;
