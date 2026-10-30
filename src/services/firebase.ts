import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { PinnedRunState } from '../components/SimulationComparison';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Authentication helper
export const ensureAuthenticated = async (): Promise<User | null> => {
  if (auth.currentUser) return auth.currentUser;
  try {
    const cred = await signInAnonymously(auth);
    return cred.user;
  } catch (err) {
    console.warn('Anonymous sign-in skipped (offline mode or rules fallback):', err);
    return null;
  }
};

// Google Auth helpers
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.warn('Google sign-in popup prevented or canceled, falling back to authenticated credentials:', err);
    return auth.currentUser;
  }
};

export const logOut = async (): Promise<void> => {
  try {
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
  } catch (err) {
    console.warn('Sign-out error:', err);
  }
};

// Persist Pinned Run to Firestore
export const savePinnedRunToFirestore = async (pinnedRun: PinnedRunState) => {
  try {
    await ensureAuthenticated();
    const runRef = doc(db, 'pinned_runs', pinnedRun.id);
    await setDoc(runRef, {
      id: pinnedRun.id,
      name: pinnedRun.name,
      timestamp: pinnedRun.timestamp,
      config: pinnedRun.config,
      actualTestMAE: pinnedRun.actualTestMAE,
      actualTestRMSE: pinnedRun.actualTestRMSE,
      savedAt: serverTimestamp()
    });
  } catch (error) {
    console.warn('Firestore write fallback (local storage remains active):', error);
  }
};

// Fetch historical pinned benchmarks from Firestore
export const fetchPinnedRunsFromFirestore = async (): Promise<Partial<PinnedRunState>[]> => {
  try {
    await ensureAuthenticated();
    const q = query(collection(db, 'pinned_runs'), orderBy('savedAt', 'desc'), limit(10));
    const snapshot = await getDocs(q);
    const runs: Partial<PinnedRunState>[] = [];
    snapshot.forEach(docSnap => {
      runs.push(docSnap.data() as Partial<PinnedRunState>);
    });
    return runs;
  } catch (error) {
    console.warn('Firestore read fallback:', error);
    return [];
  }
};
