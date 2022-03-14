import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";

function Veggie() {

    const [veggie, setVeggie] = useState([]);

    useEffect(() => {
        getVeggie();
    }, [])

    const getVeggie = async () => {

        // Prima di eseguire la chiamata verifico se ci sono dati salvati nel Local Storage; 
        // se ci sono, li recupero da lì senza eseguire una nuova chiamata
        
        const checkLocalStorage = localStorage.getItem('veggie');

        if(checkLocalStorage) {
            setVeggie(JSON.parse(checkLocalStorage))
        } else {
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
            const data = await api.json();

            // una volta eseguita la chiamata salvo i dati ottenuti nel Local Storage
            localStorage.setItem('veggie', JSON.stringify(data.recipes));

            setVeggie(data.recipes);
        }
    }

    return (
        <Wrapper>
        <h3>Vegeterian recipes</h3>

        <Splide options={{
            arrows: false,           
            pagination: false,
            drag: "free",
            gap: "1rem",
            perPage: 3,
        }}>
            {veggie.map((recipe) => {
                return (
                    <SplideSlide key={recipe.id}>
                        <Card >
                            <p>{recipe.title}</p>
                            <img src={recipe.image} alt={recipe.title} />
                            <Gradient />
                        </Card>
                    </SplideSlide>
                )
            })}
        </Splide>

    </Wrapper>
    )
}

// Qui sotto definisco i miei componenti customizzati (con styled components)

const Wrapper = styled.div`
        margin: 4rem 0rem;
    `;

const Card = styled.div`
        border-radius: 2rem;
        min-height: 25rem;
        overflow: hidden;
        position: relative;

        img {
            border-radius: 2rem;
            position: absolute;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        p {
            position: absolute;
            z-index: 10;
            left: 50%;
            bottom: 0%;
            transform: translate(-50%, 0%);
            color: white;
            width: 100%;
            text-align: center;
            font-size: 1rem;
            font-weight: 600;
            height: 40%;
            display: flex:
            justify-content: center;
            align-items: center;
        }
    `;

const Gradient = styled.div`
    position: absolute;
    z-index: 3;
    height: 100%;
    width: 100%;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5))
    `

export default Veggie;