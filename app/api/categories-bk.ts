import { NextApiRequest, NextApiResponse } from 'next';
import { fetchCategories } from '../../services/categoryService'; // Import the service
import { Category } from '../../types/category'; // Import Category type

// Utility function for error handling
const errorHandler = (res: NextApiResponse, error: unknown, statusCode = 500) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', error); // Detailed error logging in development mode
  }
  // Returning a more specific error message to the client
  res.status(statusCode).json({
    success: false,
    error: (statusCode === 500 && process.env.NODE_ENV === 'development') ? error : 'Internal Server Error',
  });
};

// Categories API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Ensure the method is GET; early return for invalid methods
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    // Fetch categories from service
    const categories: Category[] = await fetchCategories();
    
    // If categories are empty, return a 204 No Content response
    if (categories.length === 0) {
      return res.status(204).json({ success: true, message: 'No categories found' });
    }

    return res.status(200).json({ success: true, data: categories }); // Return categories in response
  } catch (error) {
    // Handle errors (e.g., DB query failure, unexpected errors)
    errorHandler(res, error);
  }
}
