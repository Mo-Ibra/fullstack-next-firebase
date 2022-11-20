import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from 'next/router';

const Dashboard = () => {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);

    const getData =  async () => {
        if (loading) return;
        if (!user) return route.push('/');
    }

    const signOut = () => {
        auth.signOut();
        route.push('/');
    }

    useEffect(() => {
        getData();
    }, [user, loading])

    return (
        <div>
            <h1>Your posts</h1>
            <div>Posts</div>
            <p>{loading ? 'Loading' : user && user.displayName}</p>
            <button
                className="text-white bg-red-500 py-1 px-2 text-sm rounded-sm"
                onClick={signOut}>
                Sign Out
            </button>
        </div>
    )
}

export default Dashboard;