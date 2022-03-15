import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

function Recipe() {

    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");
    let params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const recipeDetails = await data.json();
        setDetails(recipeDetails);
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name])

    return (
        <DetailsWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />
            </div>
            <InfoContainer>
                <StyledButton className={activeTab === "instructions" ? "active" : ""} onClick={() => setActiveTab("instructions")} >Instructions</StyledButton>
                <StyledButton className={activeTab === "ingredients" ? "active" : ""} onClick={() => setActiveTab("ingredients")} >Ingredients</StyledButton>

                {activeTab === "instructions" && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                        <p dangerouslySetInnerHTML={{__html: details.instructions}}></p>
                    </div>
                )}

                {activeTab === "ingredients" && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => 
                            <li key={ingredient.id}>{ingredient.original}</li>
                        )}
                    </ul>
                )}
               
            </InfoContainer>
        </DetailsWrapper>
    )
}

const DetailsWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;

    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }

    h2 {
        margin-bottom: 2rem;
    }

    h3 {
        margin-bottom: 2rem;
    }

    img {
        max-width: 400px;
        height: auto;
    }

    li {
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    
    ul {
        margin-top: 2rem;
    }
`;

const StyledButton = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
`;

const InfoContainer = styled.div`
    margin-left: 10rem;

    div {
        margin-top: 2rem;
    }
`;

export default Recipe;