import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { SyntheticEvent, useState } from 'react'
import db, { auth } from '../firebase'
import { signUserIn } from '../fireBaseHooks/signUserIn'
import { useModalContext } from '../context/modalContext'
import { useUserContext } from '../context/userContext'

function SignUpForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const { handleSetUser } = useUserContext()

  const { closeModal } = useModalContext()

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()

    const createUser = async () => {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await setDoc(doc(db, 'user', user.uid), {
        name: name,
        userName: userName,
        image: '',
        uid: user.uid,
      })
      await setDoc(doc(db, 'userNamesInUse', userName), {
        uid: user.uid,
      })
      await setDoc(doc(db, 'followers', user.uid), {
        followers: [],
      })
      await setDoc(doc(db, 'following', user.uid), {
        following: [],
      })
      await setDoc(doc(db, 'reviews', user.uid), {
        reviews: [],
      })
      await setDoc(doc(db, 'watch-list', user.uid), {
        watchList: [],
      })
      void signUserIn(email, password, handleSetUser, closeModal)
    }

    const validateSignUp = async () => {
      if (password !== password2) {
        console.log('passwords do not match')
        return
      }
      if (password.length < 6) {
        console.log('password is not long enough')
        return
      }
      const document = await getDoc(doc(db, 'userNamesInUse', `${userName}`))
      // eslint-disable-next-line @typescript-eslint/unbound-method
      if (document.exists()) {
        console.log('user name is in use')
        return
      }
      void createUser()
    }
    void validateSignUp()
  }

  return (
    <form
      className="items-center text-center grid gap-8"
      aria-modal="true"
      role="dialog"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-3">
        <input
          type="text"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="UserName"
          value={userName}
          onChange={(event) => setUserName(event.target.value.toLowerCase())}
        />
        <input
          type="password"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <input
          type="password"
          className="p-2 bg-bg-secondary dark:bg-bg-secondary-dark rounded resize-none overflow-hidden w-full"
          placeholder="Reenter Password"
          value={password2}
          onChange={(event) => setPassword2(event.target.value)}
        />
      </div>
      <button
        className="rounded-2xl w-full text-white font-semibold bg-primary hover:bg-primary/90 mx-auto py-2"
        type="submit"
      >
        Create Account
      </button>
    </form>
  )
}

export default SignUpForm
