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
    apiGet('user/following', { userId: '2169683494' }).then((res) => {
      console.log(res.data);
      setFollowList(res.data.data)
    })
  }, []);

  const toProfile = (followId) => {
    navigate(`/profile/${followId}`, {
      replace: false,
      state: { followId},
    });
  };

  const handleUnfollow = (followingId, index) => {
    console.log(id);
    const result = apiGet('/user/dislike', {
      followingId,
      followerId: id,
    });
    if (!result.code) {
      alert('success');
    }
    followList.splice(index, 1);
    setFollowList([...followList]);
  };

  return (
    <div className="follow">
      <NavBar type={sessionStorage.getItem('type')} />
      <div className="follow_list">
        {followList.length > 0 ? (
          followList.map((item, index) => (
            <div className="follow_item" key={item.id}>
              <div className="left">
                <img alt="" className="avatar" src={item.avatar} onClick={() => toProfile(item.id)}></img>
                <div className="info">
                  <div className="nickname">{item.nickname}</div>
                  <div className="company">{item.company}</div>
                </div>
              </div>
              <div className="right">
                <Button onClick={() => handleUnfollow(item.id, index)}>unfollow</Button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty">No Data</div>
        )}
      </div>
    </div>
  );
};

export default FollowPage;
