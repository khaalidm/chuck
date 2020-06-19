import React, { Component } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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
    const {loading, error, data} =useQuery(GET_RANDOM_JOKE, {
      variables: { category: category }
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;
  
    return {content: data.randomJoke.content, categories: data.randomJoke.categories }; 
  }

// add Class here and fix this shit