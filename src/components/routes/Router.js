import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Users from '../../pages/users/Users'
import User from '../../pages/user/User'

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/:userlogin/details" exact component={User} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
