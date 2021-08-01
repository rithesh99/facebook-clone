import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { db } from '../firebase'
import {
   ChatAltIcon,
   ShareIcon,
   ThumbUpIcon
} from "@heroicons/react/outline"

function Posts() {
     const [posts, setPosts] = useState([])
    
    useEffect(() => {
        async function getPosts(){
            await db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
                setPosts(snapshot.docs.map((doc) => doc.data()))
          );
        }
        getPosts()
    }, [])
    
    return (
        <div>
            {posts && posts.length > 0 && posts.map((post,i) => {
                return(
                    <div className="flex flex-col" key={i}>
                        <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                            <div className="flex items-center space-x-2">
                                <Image 
                                  className="rounded-full"
                                  src={post.image}
                                  width="40"
                                  height="40"
                                  alt=""
                                  />
                                  <div>
                                      <p className="font-medium">{post.name}</p>
                                      {/* <p className="text-xs text-gray-100">{new Date(post.timestamp?.toDate()).toLocaleString()}</p> */}
                                  </div>
                            </div>
                            <p className="pt-4">{post.message}</p>
                        </div>
                        {post.postImage && (
                            <div className="relative h-56 md:h-96 bg-white">
                                <Image
                                src={post.postImage}
                                objectFit="cover"
                                layout="fill"
                                alt=""
                                />
                            </div>
                        )}
                        <div className="flex justify-between rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
                            <div className="inputIcon rounded-none rounded-bl-2xl">
                               <ThumbUpIcon className="h-4"/>
                               <p className="text-xs sm:text-base">Like</p>
                            </div>
                            <div className="inputIcon rounded-none">
                                <ChatAltIcon className="h-4"/>
                               <p className="text-xs sm:text-base">Comment</p>

                            </div>
                            <div className="inputIcon rounded-none rounded-br-2xl">
                                <ShareIcon className="h-4"/>
                               <p className="text-xs sm:text-base">Share</p>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Posts
