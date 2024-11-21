import { createPool, Pool } from 'mysql2/promise'; // Importing the createPool method and Pool class from the mysql2/promise library
import { dbConfig } from '../config/dbConfig';  // Import the database configuration from config/dbConfig.ts

// Interface for database client, specifying the methods the client should implement
interface DatabaseClient {
  query<T>(query: string, params?: any[]): Promise<T>; // Method for querying the database with an optional parameters array
  testConnection(): Promise<void>; // Method to test if the database connection is successful
  close(): Promise<void>; // Method to close the database connection
}

// Configuration interface for MySQL, typed to ensure the required properties exist
interface MySQLConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

// MySQL Client Singleton Class that ensures only one instance of the MySQL connection is created
class MySQLClient implements DatabaseClient {
  private static instance: MySQLClient | null = null; // Static property to hold the singleton instance
  private pool: Pool | null = null; // Pool property to store the connection pool, which is used to interact with the database

  // Private constructor ensures that the class cannot be instantiated directly from outside
  private constructor(private config: MySQLConfig) {}

  // Static method to get the instance of the MySQLClient
  // If the instance is not created yet, it creates a new one
  static getInstance(config: MySQLConfig): MySQLClient {
    if (!MySQLClient.instance) { // Check if the instance is null (not created)
      MySQLClient.instance = new MySQLClient(config); // Create the instance
    }
    return MySQLClient.instance; // Return the singleton instance
  }

  // Private method to get the connection pool
  private getPool(): Pool {
    if (!this.pool) { // If the pool has not been created
      this.pool = createPool(this.config); // Create the pool using the provided configuration
    }
    return this.pool; // Return the pool
  }

  // Method to execute queries on the database
  async query<T>(sql: string, params?: any[]): Promise<T> {
    try {
      const [results] = await this.getPool().execute(sql, params); // Execute the query and get results
      return results as T; // Return the results, cast to the expected type
    } catch (error) {
      console.error('MySQL query error:', error); // Log any query error
      throw new Error('Failed to execute MySQL query'); // Throw a new error if the query fails
    }
  }

  // Method to test if the MySQL connection is working
  async testConnection(): Promise<void> {
    try {
      await this.getPool().query('SELECT 1'); // Simple query to test the connection
      console.log('MySQL connection successful'); // Log success if the connection is valid
    } catch (error) {
      console.error('MySQL connection failed:', error); // Log error if the connection fails
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  // Method to close the MySQL connection pool
  async close(): Promise<void> {
    if (this.pool) { // If the pool exists
      await this.pool.end(); // End the pool connection gracefully
      this.pool = null; // Set the pool to null to signify it has been closed
      console.log('MySQL connection closed'); // Log that the connection has been closed
    }
  }
}

// Factory class to manage the singleton MySQL client instance
export class DatabaseClientFactory {
  private static mysqlClient: MySQLClient | null = null; // Static property to hold the MySQL client instance

  // Static method to get the MySQL client instance
  static getMySQLClient(): MySQLClient {
    if (!this.mysqlClient) { // If the MySQL client instance does not exist
      this.mysqlClient = MySQLClient.getInstance(dbConfig); // Create the client instance using the configuration
    }
    return this.mysqlClient; // Return the MySQL client instance
  }
}
