import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { useRouter } from 'next/router';
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import Message from "../components/message";
import Link from "next/link";
import { AiFillEdit } from 'react-icons/ai';
import { BsTrash2Fill } from 'react-icons/bs';
import { toast } from 'react-toastify';

const Dashboard = () => {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    const getData = async () => {
        if (loading) return;
        if (!user) return route.push('/');


        // Get posts of `user.id`
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, where("user", "==", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return unsubscribe;
    }

    const signOut = () => {
        auth.signOut();
        route.push('/');
    }

    const deletePost = async (id) => {
        const docRef = doc(db, "posts", id);
        await deleteDoc(docRef);
        toast.success("Post has been deleted", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
        });
    }

    useEffect(() => {
        getData();
    }, [user, loading]);

    console.log(posts);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-500">POSTS:</h1>

            {posts.map(post => (
                <Message key={post.id} {...post}>
                    <div className="flex gap-4">
                        <button
                            onClick={() => deletePost(post.id)}
                            className="text-pink-600 flex items-center justify-center gap-2 py-2 text-sm"
                        >
                            <BsTrash2Fill className="text-2xl" /> Delete
                        </button>
                        <Link href={{ pathname: "/post", query: post }}>
                            <button className="text-teal-600 flex items-center justify-center gap-2 py-2 text-sm">
                                <AiFillEdit className="text-2xl" />
                                Edit
                            </button>
                        </Link>
                    </div>
                </Message>
            ))}

            {
                !posts.length && (
                    <div className="my-4">
                        <p>Sorry you don't have any posts</p>
                        <p>You can create from <Link href={{ pathname: "/post" }}><span className="text-blue-500">Here</span></Link></p>
                    </div>
                )
            }

            <div className="text-center my-5">
                <p className="text-md font-bold text-gray-500">{loading ? 'Loading' : user && user.displayName}</p>
                <button
                    className="text-white bg-red-500 py-1 px-2 text-sm rounded-sm"
                    onClick={signOut}>
                    Sign Out
                </button>
            </div>

        </div>
    )
}

export default Dashboard;