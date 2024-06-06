import { ref } from 'vue';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const user = ref(null);

onAuthStateChanged(auth, (_user) => {
  user.value = _user;
});

const useAuth = () => {
  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  return { user, signIn, signOut: signOutUser };
};

export default useAuth;
