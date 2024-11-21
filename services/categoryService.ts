import { Category } from '../types/category';
import { DatabaseClientFactory } from '../lib/db';

// Fetch categories from the database along with product counts
export const fetchCategories = async (): Promise<Category[]> => {
  const dbClient = DatabaseClientFactory.getMySQLClient();
  try {
    // Query to get categories along with product count
    const categories: Category[] = await dbClient.query<Category[]>(`
      SELECT 
        categories.id,
        categories.title,
        categories.slug,
        categories.img,
        categories.bg,
        COUNT(products.id) AS item_count
      FROM categories
      LEFT JOIN products ON products.category_id = categories.id
      GROUP BY categories.id;
    `);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};
