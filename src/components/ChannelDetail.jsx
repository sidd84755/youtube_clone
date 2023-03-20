import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([])

  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items));
  },[id])
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:'red',
            zIndex:10,
            height:"100px"
          }}
        />
          <ChannelCard channelDetail={channelDetail} marginTop="-100px"/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr:{sm:"150px"}}}/>
        <Videos videos={videos}/>
      </Box>
    </Box>
  )
}

export default ChannelDetail
