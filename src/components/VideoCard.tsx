import { collection, getDoc, query, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { db } from '../config/config';
function VideoCard({ data, deleteVideo }) {
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
      <button onClick={() => deleteVideo()} className="ml-5">
        delete button
      </button>
    </div>
  );
}

export default VideoCard;
