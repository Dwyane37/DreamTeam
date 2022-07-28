import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import NavBar from '../components/component_NavBar/NavBar';
import './FollowPage.css';
import { apiGet, apiPost } from '../components/API';
import { useNavigate } from 'react-router-dom';

const FollowPage = ({ socket }) => {
  const [followList, setFollowList] = useState([
    {
      avatar: 'https://p.qqan.com/up/2022-6/16546520684299711.jpg',
      nickname: 'aliy',
      company: 'google',
      isFollow: true,
      isFan: true,
      id: 2169683494,
    },
    {
      avatar: 'https://p.qqan.com/up/2022-6/16546520684299711.jpg',
      nickname: 'tom',
      company: 'google',
      isFollow: true,
      isFan: true,
      id: 2169683495,
    },
    {
      avatar: 'https://p.qqan.com/up/2022-6/16546520684299711.jpg',
      nickname: 'bob',
      company: 'google',
      isFollow: true,
      isFan: true,
      id: 2169683496,
    },
  ]);
  const navigate = useNavigate();

  const id = sessionStorage.getItem('id');

  useEffect(() => {
<<<<<<< HEAD
    apiGet('user/following', { userId: '2169683494' }).then((res) => {
      console.log(res.data);
      setFollowList(res.data.data);
    });
=======
    apiGet('user/following', { userId: id }).then((res) => {
      console.log(res);
      setFollowList(res.errormessage)
    })
>>>>>>> WuHanqiu-patch-1
  }, []);

  const toProfile = (followId) => {
    navigate(`/profile/${followId}`, {
      replace: false,
      state: { followId },
    });
  };

  const handleUnfollow = (e, followingId, index) => {
    e.stopPropagation();
    const result = apiGet('/user/dislike', {
      followingId,
      followerId: id,
    });
    // if (!result.code) {
    //   // alert('success');
    // }
    followList.splice(index, 1);
    setFollowList([...followList]);
  };

  return (
    <div className='follow'>
      <NavBar type={sessionStorage.getItem('type')} />
      <div className='follow_list'>
        {followList.length > 0 ? (
          followList.map((item, index) => (
<<<<<<< HEAD
            <div className="follow_item" key={item.id} onClick={() => toProfile(item.id)}>
              <div className="left">
                <img alt="" className="avatar" src={item.avatar}></img>
                <div className="info">
                  <div className="nickname">{item.nickname}</div>
                  <div className="company">{item.company}</div>
                </div>
              </div>
              <div className="right">
                <Button onClick={(e) => handleUnfollow(e, item.id, index)}>unfollow</Button>
=======
            <div className='follow_item' key={item.id}>
              <div className='left'>
                <img
                  alt=''
                  className='avatar'
                  src={item.avatar}
                  onClick={() => toProfile(item.id)}
                ></img>
                <div className='info'>
                  <div className='nickname'>{item.username}</div>
                  <div className='company'>{item.company}</div>
                </div>
              </div>
              <div className='right'>
                <Button onClick={() => handleUnfollow(item.id, index)}>
                  unfollow
                </Button>
>>>>>>> WuHanqiu-patch-1
              </div>
            </div>
          ))
        ) : (
<<<<<<< HEAD
          <div className="empty">You haven't followed any employers yet</div>
=======
          <div className='empty'>No Data</div>
>>>>>>> WuHanqiu-patch-1
        )}
      </div>
    </div>
  )
};

export default FollowPage;
