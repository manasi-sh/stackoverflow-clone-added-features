import React, { useRef, useState } from 'react';
import Hammer from 'react-hammerjs';
import './Video.css';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import video from '../../assets/video.mp4';

const Video = ({ slideIn, handleSlideIn }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleDoubleTap = (event) => {
    event.preventDefault();
    console.log('Double Click');
    const videoElement = videoRef.current;
  
    if (videoElement) {
    console.log('Double Click1');
      const { center } = event;
      const videoRect = videoElement.getBoundingClientRect();
      const videoCenterX = videoRect.left + videoRect.width / 2;
  
      if (center.x < videoCenterX - 30) {
        console.log('Double Tap on Left of Video');
        // Rewind action
        videoElement.currentTime -= 5; // Rewind by 5 seconds
      } else if (center.x > videoCenterX + 30) {
        console.log('Double Tap on Right of Video');
        // Forward action
        videoElement.currentTime += 10; // Forward by 10 seconds
      } else {
        console.log('Double Tap in the Middle of Video');
        // Play/Pause action
        if (isPlaying) {
          videoElement.pause();
        } else {
          videoElement.play();
        }
        setIsPlaying(!isPlaying);
      }
    }
  };
  
  const handlePress = (event) =>{
    event.preventDefault();
    console.log("Long Press")
    const videoElement = videoRef.current;
  
    if (videoElement) {
      const { center } = event;
      const videoRect = videoElement.getBoundingClientRect();
      const videoCenterX = videoRect.left + videoRect.width / 2;
  
      if (center.x < videoCenterX - 30) {
        console.log('Long Press on Left of Video');
        videoElement.playbackRate = 1;
      } else if (center.x > videoCenterX + 30) {
        console.log('Long Press on Right of Video');
        videoElement.playbackRate = 2;
      }
  }
}

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn}/>
      <div className="home-container-2">
        <h1 className="video-h1">Custom Video Player</h1>
        <Hammer
          onDoubleTap={handleDoubleTap}
          onPress={handlePress}
        >
        <div>
          <video ref={videoRef} controls height="280px" width="500px">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        </Hammer>
      </div>
    </div>
  );
};

export default Video;


