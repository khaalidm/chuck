import React, { useState } from "react";
import Button from "react-bootstrap/Button"
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner"
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
let showSpinner = false;

function GetRandomJoke(category) {
	const { loading, error, data, refetch} = useQuery(GET_RANDOM_JOKE, {
		variables: { category: category.name },
	});
	if (error) return {};
	if (loading) return <h1>Loading...</h1>;	

	while (check) {
		check =false;
		showSpinner = true;
		refetch();
		
	}
	return { randomJoke: data };
}

function App() {
	const { loading, error, data } = useQuery(GET_CATEGORIES);
	const [category, setCategory] = useState(false);
	let { randomJoke } = GetRandomJoke(category);
	if (error) return <h1>Something went wrong!</h1>;
	if (loading) return <h1>Loading...</h1>;

	return (
		<main className="App">
			<Container>
				<Row>
				<Col>
				<div className ="leftPanel"></div>
				</Col>
				<Col xs={10}>
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
					<div className="button-style">
							{ <Button variant="secondary" onClick={() => {
									check =true;
								 	randomJoke?.randomJoke ? setCategory({name: randomJoke?.randomJoke?.category[0]}) : setCategory({name: "dev"})
									console.log("I clicked a button");
							}}>get joke</Button> }
						</div>
					</Col>
					<Col>
					<div className ="spinner-style">
					{!showSpinner ? "" : randomJoke?.randomJoke ? <h3>{randomJoke?.randomJoke?.category[0]}</h3> : <Spinner animation="grow"/> }
					</div>
					</Col>
					<Col>
					<DropdownButton
							id="dropdown-basic-button"
							title="Select Category"
							className="drop-down-style"
							enabeld="true"
						>
							{data.categories.map((jokeCategory) => (
								<Dropdown.Item onClick={() => { 
									check =true;
									setCategory(jokeCategory);
								}}>
									{jokeCategory.name}
								</Dropdown.Item>
							))}
						</DropdownButton>

					</Col>
				</Row>
				<Row>
					{/* <Col md={4}></Col> */}
					<Col>
						<div className="divParagraphStyle">
							<p className="jokeParagraphStyle">
								{randomJoke?.randomJoke?.content}
							</p>
						</div>
					</Col>
					{/* <Col md={4}></Col> */}
				</Row>
				</Col>
									<Col className="rightPanel">
										<div className="rightPanel"></div>
									</Col>
									
				</Row>
			</Container>
		</main>
	);
}

export default App;
