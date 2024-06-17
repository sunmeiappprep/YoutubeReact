import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateDifference } from '../../utils/dateUtils';
import { getColorFromInitial } from '../../utils/getColorFromInitial';
function DisplaySearchVideoThumbnail({ id, title, description, view, url, generatedDate, thumbnail,userId,username }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/video/${id}`);
    };

    const initial = username[0];
    const circleColor = getColorFromInitial(initial);

    return (
        <div className="flex items-start bg-custom-dark rounded shadow-md w-full max-w-6xl">
            <div className="flex-shrink-0 w-128" onClick={handleClick}> 
                <div className="relative cursor-pointer" style={{ paddingTop: '56.25%' }}>
                    <img src={thumbnail} alt="Video thumbnail" className="absolute top-0 left-0 w-full h-full object-cover rounded-lg" />
                </div>
            </div>
            <div className="ml-4 flex-1">
                <h2 
                    className="text-lg font-semibold cursor-pointer hover:underline text-custom-white-thumbnail" 
                    onClick={handleClick}
                >
                    {title}
                </h2>
                <div className="flex gap-2 items-center my-2 text-sm">
                    <p className="text-gray-500">Views: {view}</p>
                    <p className="text-gray-500">Generated Date: {new Date(generatedDate).toLocaleDateString()} ago</p>
                </div>
                <div className="flex items-center mb-2">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-2 "
                        style={{ backgroundColor: circleColor }}
                    >
                        <span className="text-white font-bold text-lg">{initial}</span>
                    </div>
                    <p className="text-gray-500 text-sm">{username}</p>
                </div>
                <p className="text-gray-500 line-clamp-1 text-sm">{description}</p>
            </div>
        </div>
    );
}

export default DisplaySearchVideoThumbnail;