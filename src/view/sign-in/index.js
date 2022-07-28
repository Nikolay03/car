import React from 'react'

import SignInContainer from './SignInContainer'

import Layout from '~/components/Layout'

// eslint-disable-next-line require-await,func-style
async function action (props) {
  // const { store, isServer } = props
  // if (isServer) {
  //
  // }

  return {
    title: 'Авторизация',
    component: (
      <Layout {...props}>
        <SignInContainer />
      </Layout>
    )
  }
}

export default action
