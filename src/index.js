import React from 'react';
import ReactDOM from 'react-dom/client';
// import StarRating from "./StarRating";
// import SectionChallenge from "./SectionChallenge";
import './index.css';
import App from './App';
// import './styles.css'

// function Test() {
//     const [movieRating, setMovieRating] = useState(0 );
//     const handleMovieRating = (rating)=>{
//         setMovieRating(rating);
//     }
//     return (
//         <div>
//             <StarRating maxRating={8} color={"blue"} onRatingChange={handleMovieRating}/>
//             <p>This movie was rated {movieRating} Stars</p>
//         </div>
//     )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
)


// root.render(
//     <React.StrictMode>
//         <SectionChallenge/>
//     </React.StrictMode>
// )

// root.render(
//     <React.StrictMode>
//         {/*<App />*/}
//         <StarRating maxRating={5} message={[
//             "Terrible", "Bad", "Okay", "Good", "Amazing"
//         ]} defaultRating={5}/>
//         <StarRating size={24} color={"red"} maxRating={5} className="test"/>
//         <Test/>
//
//     </React.StrictMode>
// );
