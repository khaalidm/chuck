import React from "react"
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import "./App.css"

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

function GetRandomJoke({ category }) {
  const {loading, error, data} =useQuery(GET_RANDOM_JOKE, {
    variables: { category: category }
  });
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return data.randomJoke.content;
}

const CategoryTile = ({category}) => (
  <div className="Card">
    <a href={`https://github.com/`} className="Card--link">
      {GetRandomJoke({category})}
    </a>
  </div>
)

function App() {
  const { loading, error, data } = useQuery(GET_CATEGORIES)
  console.log(data);
  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>

  return (
    <main className="App">
      <h1>Chuck Norris jokes :)</h1>
      <body>
        <div className="card-rapper">
      {data.categories.map((d, idx) => (
        <CategoryTile key={idx} category={d.name} />
      ))}
        </div>
      </body>
    </main>
  )
}

export default App
