/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword, User, signOut } from 'firebase/auth';
import { auth } from '../../../firebase';

interface AuthContextType {
  user?: User | null;
  loading: boolean;
  error?: string;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  useEffect(() => {
    // Check if there is a currently active session
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoadingInitial(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const login = (email: string, password: string): Promise<void> => {
    setLoading(true);
    return setPersistence(auth, browserSessionPersistence)
      .then(() => signInWithEmailAndPassword(auth, email, password))
      .then((userCredential) => {
        setUser(userCredential.user);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        return Promise.reject(error);
      });
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // Here you should implement your sign-up logic
      console.log('SignUp function called with:', email, password);
      // Simulate successful sign-up
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return Promise.reject(error);
    }
  };

  const logout = (): Promise<void> => {
    setLoading(true);
    return signOut(auth)
      .then(() => {
        setUser(null);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        return Promise.reject(error);
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error],
  );

  return <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>;
}

export default function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
