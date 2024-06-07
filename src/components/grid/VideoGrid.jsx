import React from 'react';
                   
import VideoThumbnail from './VideoThumbnailPicture'; 
import YouTubeHoverAutoplay from './YouTubeHoverAutoplay';

function VideoGrid({ videos }) { 
    console.log(videos)
    return (
        <div className="mx-auto px-4 py-8 w-full">
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                {videos.map((video) => (
                    <div key={video.videoId}>
                        <VideoThumbnail
                            videoId={video.videoId}
                            title={video.videoTitle}
                            uploader={video.username}
                            generatedDate={video.videoGeneratedDate}
                            view={video.videoViews}
                            url={video.videoUrl.split("=")[1]}
                            userId={video.userId}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VideoGrid;
