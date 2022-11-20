import { FcGoogle } from 'react-icons/fc';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { auth } from '../../utils/firebase';

import { useRouter } from 'next/router';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';

const Login = () => {
    const route = useRouter();
    const [user, loading] = useAuthState(auth);
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            route.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (user) {
            route.push('/')
        }
    }, [user]);

    return (
        <>
            {loading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
                    <h2 className="text-2xl font-medium">Join Today</h2>
                    <div className="py-4">
                        <h3 className="py-4">Sign in with one of the providers</h3>
                        <button
                            onClick={googleLogin}
                            className="text-white bg-gray-700 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
                        >
                            <FcGoogle className="text-2xl" />
                            Sign in with Google
                        </button>
                    </div>
                </div>
            )}
        </>
    )

}

export default Login;