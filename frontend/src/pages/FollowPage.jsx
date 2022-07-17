import React, { useState } from 'react'
import Button from '@mui/material/Button'
import NavBar from '../components/component_NavBar/NavBar'
import './FollowPage.css'

const FollowPage = () => {
  const [followList, setFollowList] = useState([
    {
      avatar: 'https://p.qqan.com/up/2022-6/16546520684299711.jpg',
      nickname: 'aliy',
      company: 'google',
      isFollow: true,
      isFan: true
    },
    {
      avatar: 'https://p.qqan.com/up/2022-6/16546520684299711.jpg',
      nickname: 'tom',
      company: 'google',
      isFollow: true,
      isFan: true
    },
    {
      avatar: 'https://p.qqan.com/up/2022-6/16546520684299711.jpg',
      nickname: 'bob',
      company: 'google',
      isFollow: true,
      isFan: true
    },
  ])

  return (
    <div className='follow'>
      <NavBar />
      <div className='follow_list'>
        {followList.length &&
          followList.map((item) => (
            <div className='follow_item'>
              <div className='left'>
                <img className='avatar' src={item.avatar}></img>
                <div className='info'>
                  <div className='nickname'>{item.nickname}</div>
                  <div className='company'>{item.company}</div>
                </div>
              </div>
              <div className='right'>
                {item.isFollow ? (
                  <Button>unfollow</Button>
                ) : (
                  <Button>follow</Button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default FollowPage
