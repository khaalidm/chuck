const { RESTDataSource } = require('apollo-datasource-rest');

class ChuckNorrisApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.chucknorris.io/';
  }

  async getCategories() {
      const response = await this.get('jokes/categories');
      console.log(response);
      return Array.isArray(response)
      ? response.map(category => this.categoryReducer(category))
      : [];
  }

  async getRandomJokeByCategory(categoryName) {
      const response = await this.get('jokes/random?', categoryName);
      return this.jokeReducer(response);
  }

  categoryReducer(category) {
      return {
          name: category
      };
  }

  jokeReducer(joke) {

      return {
          id: joke.id ,
          category: joke.categories,
          content: joke.value
      }
  }

}

module.exports = ChuckNorrisApi;