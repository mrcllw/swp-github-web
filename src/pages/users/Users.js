import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Users.css'
import { baseURL, http } from '../../config/http'
import Container from '../../components/container/Container'
import Card from '../../components/card/Card'
import Image from '../../components/image/Image'
import Button from '../../components/button/Button'
import Loading from '../../components/loading/Loading'

const API_GET_USERS_URL = `${baseURL}/users`

const Users = () => {
  const [users, setUsers] = useState([])
  const [nextPage, setNextPage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers(url = API_GET_USERS_URL) {
    setLoading(true)
    const { data: { users, nextPage } } = await http({ baseURL: url })
    setUsers(users)
    setNextPage(nextPage)
    setLoading(false)
  }

  return (
    <Container>
      <Card>
        {loading ? <Loading /> : (
          <ul className="list">
            {users.map(user => (
              <li className="list-item" key={user.id}>
                <Image src={user.avatar_url} />
                <div>
                  <p className="id"># {user.id}</p>
                  <Link className="login" to={`/${user.login}/details`}>
                    {user.login}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Button label="Next Page" onClick={() => getUsers(nextPage)} />        
      </Card>
    </Container>
  )
}

export default Users
