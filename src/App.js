import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import Home from './components/Home'
import AddProperty from './components/AddProperty'

import NotFound from './components/NotFound'
import 'bootstrap/dist/css/bootstrap.css'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import EditProperty from './components/EditProperty'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <Route exact path="/sign-up" component={SignUpForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/add-property" component={AddProperty} />
    <ProtectedRoute exact path="/edit-property" component={EditProperty} />
    <Route component={NotFound} />
  </Switch>
)
export default App