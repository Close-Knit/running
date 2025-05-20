// src/components/YouTubeEmbed.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './YouTubeEmbed.css';

/**
 * Component for embedding YouTube videos
 * 
 * @param {Object} props - Component props
 * @param {string} props.videoId - YouTube video ID
 * @param {string} props.title - Title for the video (for accessibility)
 * @param {number} props.width - Width of the video player (default: 560)
 * @param {number} props.height - Height of the video player (default: 315)
 */
function YouTubeEmbed({ videoId, title, width = 560, height = 315 }) {
  return (
    <div className="youtube-embed-container">
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title || "YouTube video player"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

YouTubeEmbed.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default YouTubeEmbed;
