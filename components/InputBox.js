import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/client";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import firebase from "firebase";

function InputBox() {
  const [session] = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const addPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) {
      alert("Post added");
      return;
    }
    db.collection("posts")
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, "data_url");
          setImageToPost(null);
          uploadTask.on(
            "state_change",
            null,
            (error) => console.log(error),
            (complete) => {
              //when upload completes
              // storage.ref(`posts/${doc.id}`).getDownloadURL()
              storage
                .ref("posts")
                .child(doc.id)
                .getDownloadURL()
                .then((url) => {
                  db.collection("posts").doc(doc.id).set(
                    {
                      postImage: url,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });
    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image
          className='rounded-full'
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed'
          alt=''
        />
        <form className='flex flex-1'>
          <input
            ref={inputRef}
            type='text'
            placeholder={`What's on your mind, ${session.user.name}?`}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
          />
          <button hidden type='submit' onClick={addPost}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={() => setImageToPost(null)}
            className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover: scale-105 cursor-pointer'
          >
            <img src={imageToPost} className='h-10 object-contain' alt='' />
            <p className='text-xs text-red-500 text-center'>Remove</p>
          </div>
        )}
      </div>
      <div className='flex justify-evenly p-3 border-t'>
        <div className='inputIcon'>
          <VideoCameraIcon className='h-7 text-red-500' />
          <p className='text-sm sm:text-sm xl:text-base'>Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className='inputIcon'
        >
          <CameraIcon className='h-7 text-green-500' />
          <p className='text-sm sm:text-sm xl:text-base'>Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type='file'
            hidden
          />
        </div>
        <div className='inputIcon'>
          <EmojiHappyIcon className='h-7 text-yellow-500' />
          <p className='text-sm sm:text-sm xl:text-base'>Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
