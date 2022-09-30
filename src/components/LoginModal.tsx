import { useState } from 'react'

import Modal from './ui/Modal'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

function LoginModal() {
  const [title, setTitle] = useState('Login')
  return (
    <Modal title={title}>
      {title === 'Login' && <LoginForm setTitle={setTitle} />}
      {title === 'Sign Up' && <SignUpForm />}
    </Modal>
  )
}

export default LoginModal
