import React from 'react'
import '../../theme/views.css';

import Button from '../common/ButtonLink'
import Feature from '../layouts/Feature'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {fas} from '@fortawesome/free-solid-svg-icons'

const Home = (props) => {
    return (
        <main>
            <section className="container-intro">
                <h2>Welcome to</h2>
                <h1>Roomer</h1>
                <h3>Are you looking for your perfect flatshare?</h3>
                <p>Create an account or log in to contact ads, save your favourites, and much more</p>
                <div className="button-containerh">
                <Button buttonClass="button-white" 
                        routeText="/auth/signup"
                        buttonText="Sign up"
                        />
                <Button buttonClass="button-white" 
                        routeText="/auth/login"
                        buttonText="Log in"
                        />
                </div>
                <p className="scroll-call">Scroll down to know more <FontAwesomeIcon icon={fas.faArrowDown}/></p>
            </section>
            <section className="container-features">
                <h1>Why Roomer?</h1>
                <div className="features-h">
                <Feature
                    image="/images/clock.png"
                    alt="time"
                    featureTitle="FAST AND SIMPLE"
                    featureText="You will be able to find your ideal roomie
                                and a flat that matches your specific needs
                                in an easy and fast way."/>
                <Feature
                    image="/images/check.png"
                    alt="trust"
                    featureTitle="TRUSTWORTHY"
                    featureText="Contact directly with the interested parties.
                                Chat with your new roomie directly and get
                                to know him/her."/>
                <Feature
                    image="/images/personalized.png"
                    alt="personalized"
                    featureTitle="PERSONALIZED"
                    featureText="Filter by location, price, range,bedroom count,
                                pet-friendly and save your favourites so that you
                                don't miss your opportunity."/>
                </div>
            </section>
            <section className="container-callact">
                <h2>Start searching for your ideal roommate</h2>
                <div className="button-containerv">
                <Button buttonClass="button-dark" 
                        routeText={"/rooms"}
                        buttonText="Search for a room"
                        />
                <Button buttonClass="button-light" 
                        routeText={"/rooms/add"}
                        buttonText="Publish a room"
                        />
                </div>
            </section>
        </main>
    )
}

export default Home
