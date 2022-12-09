import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

const Post = () => {

    const [post, setPost] = useState({ description: "" });
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const routeData = route.query;

    const toastOptions = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
    }

    const submitPost = async (e) => {
        e.preventDefault();
        console.log('Submit');

        // Checking description
        if (!post.description) {
            toast.error("Description field is required", toastOptions);
            return;
        }

        // If length more than 300
        if (post.description.length > 300) {
            toast.error("Description is too long!", toastOptions);
            return;
        }

        if (post?.hasOwnProperty("id")) {
            // Update Post
            const docRef = doc(db, "posts", post.id);
            const updatedPost = { ...post, timestamp: serverTimestamp() };
            await updateDoc(docRef, updatedPost);
            toast.success("Post Updated", toastOptions);
            return route.push("/");

        } else {

            // Create new post (Firebase)
            const collectionRef = collection(db, "posts");
            await addDoc(collectionRef, {
                ...post,
                timestamp: serverTimestamp(),
                user: user.uid,
                avatar: user.photoURL,
                username: user.displayName,
            });

            // Success
            setPost({ description: "" });
            toast.success("Post Added", toastOptions);
            return route.push("/");
        }
    }

    // Check user
    const checkUser = () => {
        if (loading) return;
        if (!user) route.push("/auth/login");
        if (routeData.id) {
            setPost({ description: routeData.description, id: routeData.id });
        }
    }


    useEffect(() => {
        checkUser();
    }, [user, loading]);

    return (
        <div className="my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-2xl font-bold">
                    {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
                </h1>
                <div className="py-2">
                    <h3 className="text-lg font-medium py-2">Description</h3>
                    <textarea
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        className="bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm"
                    >
                    </textarea>
                    <p
                        className={`text-cyan-600 font-medium text-sm ${post.description.length > 300 ? "text-red-600" : ""
                            }`}
                    >
                        {post.description.length}/300
                    </p>
                </div>
                <button
                    type="submit"
                    className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Post;