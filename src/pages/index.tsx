import { DocumentData } from '@google-cloud/firestore'
import { FormEvent, useEffect, useMemo, useState } from 'react'
import { firestore } from '../services/firebase'
import {useCollection} from 'react-firebase-hooks/firestore'

type User = {
  name: string
  id:string
}

const transformUser = (user:DocumentData) => ({
  id: user.id,
  ...user.data()
} as User)

function Index() {
  const [name, setName] = useState('')
  
  const [value, loading, error] = useCollection(firestore.collection('users'))

 const data = useMemo<User[]>(() => value?.docs.map((user:DocumentData) => ({id:user.id, ...user.data()} as User)) || [], [value])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if(!name) return
    await firestore.collection('users').add({ name})
    setName('')
  }

  const updateUser = async(userId:string) => {
    await firestore.doc(`users/${userId}`).update({ name: 'chinelooooooooooooo'})
  }

  const deleteUser = async(userId:string) => {
    await firestore.doc(`users/${userId}`).delete()
  }

  if(loading) {
    return 'Loading...'
  }

  if(error) {
    return `Error ${error.message}`
  }
  

  return (
    <div>
      <h1>Firebase workshop! 🚀</h1>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={e => setName(e.target.value)} value={name}/>
        <button type="submit">submit</button>
      </form>
      <ul>
        {data?.map((user) => (
          <li key={user.id} >
            <span>{user.name} - {user.id}</span>
            <button type="button" onClick={() => updateUser(user.id)}>
                Turn on chinelo
            </button>
            <button type="button" onClick={() => deleteUser(user.id)}>
                x
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Index
