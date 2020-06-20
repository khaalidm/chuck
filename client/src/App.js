import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import ChuckGif from "../src/assets/chuck.jpg";
import Image from "react-bootstrap/Image";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const GET_CATEGORIES = gql`
	query getCategories {
		categories {
			name
		}
	}
`;

const GET_RANDOM_JOKE = gql`
	query getRandomJokeByCategory($category: String!) {
		randomJoke(category: $category) {
			id
			category
			content
		}
	}
`;

let check = true;
let data2;

function GetRandomJoke(category) {
	const { status, data, error, refetch, isFetching } = useQuery(GET_RANDOM_JOKE, {
		variables: { category: category.name },
	});
	// console.log("~~~~~~~~~~~~~~~~~~~~"+ JSON.stringify(category));
	if (error) return <h1>Something went wrong!</h1>;
	// if (loading) return <h1>Loading...</h1>;	

	while (check) {
		console.log("~~~~~~~im here~~~~~~~~~");
		// data1 = data;
		refetch();
		check =false;
	}

	return { randomJoke: data };
}

function App() {
	const { loading, error, data } = useQuery(GET_CATEGORIES);
	let [category, setCategory] = useState(false);
	let { randomJoke } = GetRandomJoke(category);
	if (error) return <h1>Something went wrong!</h1>;
	if (loading) return <h1>Loading...</h1>;

	
	// function resetCategory()
	// {
	// 	if(randomJoke?.randomJoke && randomJoke?.randomJoke.category) {
	// 		console.log({name: randomJoke.randomJoke.category[0]});
	// 	setCategory({name: randomJoke?.randomjoke?.category[0],  __typename: "Category"});
	// 	}
	// }

	return (
		<main className="App">
			<Container>
				<Row>
					<Col>
						<h1 className="heading-stlye">Chuck Jokes</h1>
					</Col>
				</Row>
				<Row>
					<Col>
						<Image src={ChuckGif} className="chuck-image" rounded thumbnail />
					</Col>
				</Row>
				<Row>
					<Col>
						<DropdownButton
							id="dropdown-basic-button"
							title="Select Category"
							className="drop-down-style"
							enabeld="true"
						>
							{data.categories.map((jokeCategory) => (
								<Dropdown.Item onClick={() => { 
								
									setCategory(jokeCategory);
								
									
								}}>
									{JSON.stringify(jokeCategory)}
								</Dropdown.Item>
							))}
						</DropdownButton>
					</Col>
				</Row>
				<Row>
					<Col md={4}></Col>
					<Col md={4}>
						<div className="divParagraphStyle">
							<p className="jokeParagraphStyle">
								{randomJoke?.randomJoke?.content}
							</p>
						</div>
						<div>
							<h1>{randomJoke?.randomJoke?.category[0]}</h1>
							{ <button onClick={() => {
									check =true;
								 	setCategory({name: randomJoke?.randomJoke?.category[0]});
									console.log("I clicked a button");
							}}>get joke</button> }
						</div>
					</Col>
					<Col md={4}></Col>
				</Row>
			</Container>
		</main>
	);
}

export default App;
