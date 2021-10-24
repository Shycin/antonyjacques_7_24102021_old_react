import PropTypes from 'prop-types'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Routes = (props) => {
  const { urls } = props
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {urls.home}
        </Route>
      </Switch>
    </Router>
  )
}
export default Routes

Routes.propTypes = {
  urls: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.element])),
}

Routes.defaultProps = {
  urls: {},
}
