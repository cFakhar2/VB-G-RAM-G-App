import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  initializeFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  increment 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Using initializeFirestore with experimentalForceLongPolling to bypass potential WebSocket issues in the sandbox
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, (firebaseConfig as any).firestoreDatabaseId || '(default)');

export const auth = getAuth(app);

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function incrementVisitorCount() {
  const visitorDocRef = doc(db, 'stats', 'visitors');
  const path = 'stats/visitors';
  const storageKey = 'vb_gram_g_visits_fallback';
  const localBase = parseInt(localStorage.getItem(storageKey) || '1241');
  
  try {
    const docSnap = await getDoc(visitorDocRef);
    
    if (!docSnap.exists()) {
      await setDoc(visitorDocRef, { count: localBase });
      localStorage.setItem(storageKey, localBase.toString());
      return localBase;
    } else {
      await updateDoc(visitorDocRef, {
        count: increment(1)
      });
      const updatedSnap = await getDoc(visitorDocRef);
      const newCount = updatedSnap.data()?.count || localBase + 1;
      localStorage.setItem(storageKey, newCount.toString());
      return newCount;
    }
  } catch (error) {
    // If offline or failed, use local storage to simulate progress for the user session
    const nextLocal = localBase + 1;
    localStorage.setItem(storageKey, nextLocal.toString());
    console.warn('Firestore fallback active (client may be offline)');
    return nextLocal;
  }
}
