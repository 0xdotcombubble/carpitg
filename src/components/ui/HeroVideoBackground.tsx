'use client'

import BackgroundVideo from 'next-video/background-video'
import heroVideo from '/videos/mixkit-close-up-of-a-mechanic-polishing-a-car-47829-hd-ready.mp4'

export function HeroVideoBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black">
      <BackgroundVideo
        src={heroVideo}
        className="object-cover brightness-75"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  )
}
