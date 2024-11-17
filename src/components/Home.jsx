import React from 'react'
import './home.css';
import logo from '../assets/logo.png';

function Home() {
  return (
    <div className="home-container">
        <header className="home-header">
            <img src={logo} className="home-logo" alt="logo" />
            <h1>Heyy! Welcome I am your freind </h1>
            <span className='txt'>Franky</span>
        </header>
        <main className="home-main">
            <p>Start chatting with me for some fun maybe <img className='funimg' src="https://cdn.discordapp.com/emojis/1303710854511988736.webp?size=96" alt="" /></p>
        </main>
    </div>
  )
}

export default Home