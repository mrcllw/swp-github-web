import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './User.css'
import { http } from '../../config/http'
import Container from '../../components/container/Container'
import Card from '../../components/card/Card'
import Image from '../../components/image/Image'
import Button from '../../components/button/Button'
import Loading from '../../components/loading/Loading'

const User = ({ history }) => {
  const { userlogin } = useParams()
  const [userDetails, setUserDetails] = useState({})
  const [userRepos, setUserRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserData()
  }, [])

  async function getUserData() {
    Promise.all([getUserDetails(), getUserRepos()]).then(responses => {
      setUserDetails(responses[0])
      setUserRepos(responses[1])
      setLoading(false)
    })
  }

  async function getUserDetails() {
    const { data } = await http.get(`/users/${userlogin}/details`)
    return data
  }

  async function getUserRepos() {
    const { data } = await http.get(`/users/${userlogin}/repos`)
    return data
  }

  return (
    <Container>
      <Card>
        {loading ? <Loading /> : (
          <>
            <div className="details">
              <Image src={userDetails.avatar_url} />
              <div>
                <p className="small"># {userDetails.id}</p>
                <p className="big login">{userDetails.login}</p>
                <a className="big" href={userDetails.html_url}>{userDetails.html_url}</a>
                <p className="small">Created at {new Date(userDetails.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="scrollable">
              <table>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>URL</th>
                </tr>
                {userRepos.map(repo => (
                  <tr key={repo.id}>
                    <td>{repo.id}</td>
                    <td>{repo.name}</td>
                    <td><a href={repo.html_url}>{repo.html_url}</a></td>
                  </tr>
                ))}
              </table>
            </div>
          </>
        )}
        <Button label="Back" onClick={() => history.goBack()}/>
      </Card>
    </Container>
  )
}

export default User
