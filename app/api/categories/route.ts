// app/api/categories/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from 'utils/errorHandler';
import { Category } from '../../../types/category';
import { fetchCategories } from '@services/categoryService';

// Categories API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const categories: Category[] = await fetchCategories();  // Fetch categories using the service function
    
    if (categories.length === 0) {
      return res.status(204).json({ success: true, message: 'No categories found' });
    }

    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    errorHandler(res, error);
  }
}
