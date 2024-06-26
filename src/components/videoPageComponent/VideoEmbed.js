import React, { forwardRef } from 'react';

const VideoEmbed = forwardRef(({ videoId }, ref) => {
  return (
    <div ref={ref} className="relative w-full overflow-hidden rounded-2xl" style={{ paddingBottom: '57.40%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
});

export default VideoEmbed;
