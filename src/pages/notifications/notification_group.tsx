import React, { useState, useEffect } from 'react'
import Notification from './notifi'
import api from '@/constants/auth'
import toast from 'react-hot-toast'

interface Noti {
  _id: String,
  noti_type: String,
  activist: {
    _id: String,
    username: String,
    avatar: String
  },
  user_id: {
    _id: String,
    username: String,
    avatar: String
  },
  read_status: Boolean,
  created_at: Date
}

const NotificationGroup = () => {

  const [notifications, setNotification] = useState<Noti[]>();

  useEffect(() => {
    api.get('/notifications').then(res => {
      console.log("notifications", res.data)
      setNotification(res.data)
    }).catch(err => {
      toast.error('There is an error in server.')
    })
  }, [])

  return (
    <div className='flex flex-col gap-4 w-full'>
      {
        notifications?.map((noti, index) => {
          return (
            <Notification id={noti._id} active={true} username={noti.activist.username} notitype={noti.noti_type} time={noti.created_at} avatar={noti.activist.avatar} key={index} />
          )
        })
      }
    </div>
  )
}

export default NotificationGroup