// import React, { useState, useEffect } from 'react';

import ProfilePageComponent from "../components/ProfilePageComponent";

const ProfilePage = () => {
    // const [user, setUser] = useState({
    //     name: 'John Doe',
    //     age: 28,
    //     height: '5\'11"',
    //     weight: '175 lbs',
    //     goals: 'Gain muscle mass',
        
    // });

    // // Example of how you might fetch user data (assuming an API is available)
    // useEffect(() => {
    //     // Fetch user data from an API
    //     // fetch('/api/user')
    //     //   .then(response => response.json())
    //     //   .then(data => setUser(data));
    // }, []);

    // return (
    //     <div>
    //         <header>
    //             <h1>{user.name}'s Profile</h1>
    //         </header>
    //         <main>
    //             <section>
    //                 <h2>Details</h2>
    //                 <p><strong>Age:</strong> {user.age}</p>
    //                 <p><strong>Height:</strong> {user.height}</p>
    //                 <p><strong>Weight:</strong> {user.weight}</p>
    //             </section>
    //             <section>
    //                 <h2>Fitness Goals</h2>
    //                 <p>{user.goals}</p>
    //             </section>
                
    //         </main>
    //         <footer>
    //             <p>&copy; 2024 FitSync Pro. All rights reserved.</p>
    //         </footer>
    //     </div>
    // );

    return (
        <ProfilePageComponent />
    )
};

export default ProfilePage;
