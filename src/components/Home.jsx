import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
function Home() {
    return (
        <header>
            <div className='main-hero'>
                <h1>Teknolojik Yemekler</h1>
                <p>KOD ACIKTIRIR<br />Pİzza, DOYURUR</p>
                <div >
                    <Link to={`/form`}>
                        <Button className='home-button' type='button'>ACIKTIM</Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Home
