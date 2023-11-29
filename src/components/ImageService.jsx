import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39793361-61fd61a37c7dccba520b78587';

async function retrieveArticles(query, page = 1, perPage = 20) {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  return { hits: response.data.hits, totalHits: response.data.totalHits };
}

const ImageService = {
  retrieveArticles: async (query, page = 1, perPage = 20) => {
    const response = await retrieveArticles(query, page, perPage);
    return response;
  },
};

export default ImageService;
