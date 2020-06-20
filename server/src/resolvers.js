module.exports = {
	Query: {
		categories: (_, __, { dataSources }) =>
			dataSources.chuckNorrisApi.getCategories(),
		randomJoke: (_, { category }, { dataSources }) =>
			dataSources.chuckNorrisApi.getRandomJokeByCategory({
				category: category,
			}),
	},
};
