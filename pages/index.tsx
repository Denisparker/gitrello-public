import type { NextPage } from 'next'
import { KanbanBoard, Login } from 'scenes'
import React from 'react'
import { useSelector } from 'react-redux'

const Home: NextPage = () => {
  const labels = useSelector(({ labels }: stateValue) => labels)
  return <>{labels.length ? <KanbanBoard /> : <Login />}</>
}

export default Home
