import axios from 'axios';

// Function to create a new quiz
export async function createQuiz(question, correctAnswer, paperId) {
   try {
      const response = await axios.post('/api/question/create', {
         question,
         correctAnswer,
         paperId
      });
      return response.data;
   } catch (error) {
      throw error.response;
   }
}
