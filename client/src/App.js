import React, {useState, useEffect} from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ChuckGif from "../src/assets/chuck.jpg";
import Image from 'react-bootstrap/Image'
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import RandomJoke from "../src/RandomJoke"

// let message = "Hey there!";
// class Random extends React.Component {
//   GetRandomJoke() {
//     console.log('Click happened');
//   }
//   render() {
//     return <button onClick={() => this.handleClick()}>Click Me</button>;
//   }
// }


const GET_CATEGORIES = gql`
    query getCategories{
    categories{
      name
      }
    }
  `;


const GET_RANDOM_JOKE = gql`
     query getRandomJokeByCategory($category: String!){
       randomJoke(category: $category){
         id
         category
         content
    
       }
  }
 `; 

function GetRandomJoke(category) {
  console.log({category})
  const {loading, error, data} =useQuery(GET_RANDOM_JOKE, {
    variables: { category: category.name }
  });
  // if (loading) return null;
  // if (error) return `Error! ${error}`;

  return{ randomJoke: data  }; 
}

function App() {
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  const [setJoke, joke] = useState(false)
  const [category, setCategory] = useState(false)
  const {randomJoke} = GetRandomJoke(category)
  
  

  
  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  console.log({randomJoke});
  

  return (
 
    <main className="App">
        <container> 
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
        <DropdownButton id="dropdown-basic-button" title="Select Category" className="drop-down-style">
      {data.categories.map(d => (
        <Dropdown.Item as="button" onSelect={
          () => setCategory(d)
        } >{d.name}</Dropdown.Item>
      ))}
        </DropdownButton>
        </Col>
      </Row>
      <Row>
      <Col md={4}></Col>
      <Col md={4}>
        <div className="divParagraphStyle">
         <p className="jokeParagraphStyle">{randomJoke?.randomJoke?.content}</p>
        </div>
      </Col>
      <Col md={4}></Col>
      </Row>
    </container> 
    </main>
     
  )
}

export default App
