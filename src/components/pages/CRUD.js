// LoginPage.jsx
import React, { useState,useEffect } from 'react';
import { postVideo,getUserVideos,updateVideo,deleteVideo,getVideo, fetchVideos, getSearchVideo,getSubscribedVideos, seedVideo } from '../../utils/videoUtils';
import { addLiked, getLiked } from '../../utils/videoReactionUtils';
import { useGlobalState } from '../../StateContext'; 
import { createComment,getComments,deleteComment, updateComment, getCommentsReaction, commentAddLiked, deleteAllComments, getVideoCommentsReactions, seedComment } from '../../utils/commentUtils';
import { loginUser,logOut, registerUser } from '../../utils/authUtils';
import { addToPlaylist, createPlaylist, deleteVideoFromPlaylist, getPlaylistVideo, getUserFirstVideo } from '../../utils/playlist';
import NavBar from '../navBar/NavBar';
import { subscribeToChannel,unsubscribeFromChannel,getSubscribers,getSubscriptions, getSubscribedChannels  } from '../../utils/subscriptionUtils';
import chess from '../../data/chess.json';
import react from '../../data/react.json';
import gadget from '../../data/gadget.json';
import pp from '../../data/tableTennis.json';
import workout from '../../data/workout.json';
import JSONUsername from '../../data/username.json';
import anime from '../../data/anime.json';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user,token,setUser, setToken,userObj,setUserObj } = useGlobalState(); // Access the context methods
  const [title, setVideoTitle] = useState('');
  const [url, setVideoURL] = useState('');
  const [description, setVideoDescription] = useState('');
  
  console.log(user, token);


  const dataSets = {
    chess: chess,
    react: react,
    gadget: gadget,
    pp: pp,
    workout:workout,
    anime:anime
};

const getRandomUsername = (category) => {
    const usernames = JSONUsername[category];
    return usernames[Math.floor(Math.random() * usernames.length)];
};

const convertViewIntoLong = (view) => {
  // Extract the last character (K or M) and the rest of the string
  let suffix = view.slice(-1);
  let numberStr = view.slice(0, -1);

  // Convert the remaining string to a number
  let number = parseFloat(numberStr);

  // Multiply based on the suffix
  if (suffix === 'K') {
      number *= 1000;
  } else if (suffix === 'M') {
      number *= 1000000;
  }

  // Return the result as a whole number
  return number;
}

const handleMakeSubmitted = async () => {
  for (const key in dataSets) {
      if (dataSets.hasOwnProperty(key) && JSONUsername.hasOwnProperty(key.toLowerCase())) {
          const dataArray = dataSets[key];
          for (let index = 0; index < dataArray.length; index++) {
              const element = dataArray[index];
              const comments = element.comments;
              const videoInfo = {
                  title: element.title,
                  url: `https://www.youtube.com/watch?v=${element.url}`,
                  description: element.description,
                  view: convertViewIntoLong(element.views),
                  username: getRandomUsername(key.toLowerCase())
              };
              // console.log(videoInfo, "testing");
              try {
                  const response = await seedVideo(videoInfo);
                  const videoId = response.id;
                  comments.forEach(comment => {
                      const commentObj = {
                          videoId: videoId,
                          text: comment
                      };
                      console.log(commentObj)
                      seedComment(commentObj);
                  });
              } catch (error) {
                  console.error("Error posting video:", error);
              }
          }
      }
  }
};

  const likedInfo = {
    userId:user,
    videoId: 3,
    liked: false,
  };

  const commentInfo = {
    text: 'tests',
  };

  const handleMassComment = () => {
    const comments = [
      "Great video! Keep up the good work!",
      "This was so helpful, thank you!",
      "Awesome content, as always!",
      "Loved every second of this video!",
      "Your videos never disappoint!",
      "So informative and well-made!",
      "Thanks for sharing this with us!",
      "You always make my day with your videos!",
      "Can't wait for your next upload!",
      "You're amazing at what you do!",
      "This is exactly what I needed, thanks!",
      "Fantastic job, keep it coming!",
      "I learned so much from this video!",
      "You’re incredibly talented!",
      "This is pure gold, thank you!",
      "Your editing is on point!",
      "You always have the best tips and advice!",
      "Such a high-quality production!",
      "This is why I’m subscribed to your channel!",
      "You’re an inspiration, keep it up!",
      "Loved the creativity in this one!",
      "This video is a game-changer!",
      "I always look forward to your content!",
      "You make everything look so easy!",
      "Your passion really shows in your work!"
    ];

    const pingPongComments = [
      "That backhand shot was incredible!",
      "I love how fast the players move, such agility!",
      "Can anyone suggest a good paddle for beginners?",
      "Wow, the spin on that serve was insane!",
      "I've never seen such precise footwork in a match.",
      "Does anyone know what brand of table they're using?",
      "I need to practice that topspin technique!",
      "The rallies in this match are so intense!",
      "How do you counter such a fast serve?",
      "This player has amazing reflexes!",
      "I wish I could play at half their skill level.",
      "Great match, both players were on fire!",
      "I learned so much from watching this video.",
      "The slow-motion replays are really helpful.",
      "Does anyone have tips for improving my serve?",
      "The commentator's insights are spot on.",
      "I didn't know you could curve the ball like that!",
      "This makes me want to hit the tables right now!",
      "The crowd's energy is really adding to the excitement.",
      "Such a great tutorial for beginners and pros alike!"
  ];
  
  
  comments.forEach(comment => {
      const commentObj = { text: comment };
      createComment(commentObj);
    });
  };
  

  const commentLikedInfo = {
    userId:user,
    commentId: 39,
    liked: true,
  };
  
  const commentLikedInfo2 = {
    userId:user,
    commentId: 39,
    liked: false,
  };




  useEffect(() => {
    console.log("Updated global state user:", user);
    console.log("Updated global state token:", token);
  }, [user, token]);

  const  handleSubmitLogin  = async (event) => {
    event.preventDefault();
    // Handle the login logic here
    let data = await loginUser("asdasd2@gmail.com", 'asdasd')
    console.log(data)
    setUser(data.user.id)
    setUserObj(data.user.username)
    setToken(data.jwtToken)
  };

  

  const handleGetSubs = async () => {
    try {
      const data = await getSubscribedVideos(1);
    } catch (error) {
      console.error('Failed to fetch subscribed videos:', error);
    }
  };

  
  
  const handleUpdateVideo = () => {
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
        title,
        url,
        description: description || 'No description provided',
    });
    alert('Video info submitted! Check console for details.');
  };

  const seedInfo = {
    seed:213213,
    page:1,
    size:10
  }
  
  const handleCreatePlaylist = () => {
    let playlistInfo = {
      title:"dwdw"
    }
    createPlaylist(playlistInfo)
  }

  const handleAddToPlaylist = () => {
    let playlistInfo = {
      playlistTitleId:69,
      videoId:186
    }
    addToPlaylist(playlistInfo)
  }
  const handleGeneratingUser = () => {
    const userData = [];

    for (const category in JSONUsername) {
        if (JSONUsername.hasOwnProperty(category)) {
            JSONUsername[category].forEach((username, index) => {
                const password = `pass${index + 1000}`; // Simple passwords for example
                userData.push({ username, password });
            });
        }
    }
    
    // Loop over the user data and register each user
    userData.forEach(user => {
        registerUser(user.username, user.password);
    });
}
// Generate user data with realistic usernames



  return (
    <div className="flex-wrap justify-center items-center h-screen ">
    <NavBar/>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"  onClick={() => { getUserVideos(1); }}>Get User Video</button>
      <button  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => handleUpdateVideo()}>Update Video</button>
      <button  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => deleteVideo(187)}>Delete Video</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getVideo(3)}>Get Video info</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => addLiked(likedInfo)}>addLiked</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getLiked(3)}>getLiked</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => handleMassComment()}>Masscomment</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={handleSubmitLogin}>Login</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => logOut()}>Logout</button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-yellow-700"  onClick={() => getComments(3)}>GetComments</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => deleteComment(98)}>deleteCommentByID</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => updateComment(354,commentInfo)}>Edit CommentByID</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => fetchVideos("123123213",2)}>getHomePageVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleCreatePlaylist}>createPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleAddToPlaylist}>addToPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getPlaylistVideo(69)}>getPlaylistVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => deleteVideoFromPlaylist(69,186)}>deleteVideoFromPlaylist</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSearchVideo("Winter")}>getSearchVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getCommentsReaction(39)}>getcomment38reaction</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => commentAddLiked(commentLikedInfo2)}>commentLikedInfofalse</button>
      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"  onClick={() => commentAddLiked(commentLikedInfo)}>commentLikedInfo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getUserFirstVideo(user)}>getUserFirstVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSearchVideo("Winter")}>getSearchVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSearchVideo("Winter")}>getSearchVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => handleGeneratingUser()}>registerUser</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={handleMakeSubmitted}>Make Video</button>

      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => deleteAllComments()}>deleteAll</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => subscribeToChannel(2)}>subscribeToChannel</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => unsubscribeFromChannel(2)}>unsubscribeFromChannel</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSubscribers(2)}>getSubscribers</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSubscriptions(1)}>getSubscriptions</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => handleGetSubs()}>getSubVideo</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getSubscribedChannels(1)}>getSubscribedChannels</button>
      <button className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-yellow-700"  onClick={() => getVideoCommentsReactions(29)}>getVideoCommentsReactions</button>
    </div>
  );
}

export default Register;
