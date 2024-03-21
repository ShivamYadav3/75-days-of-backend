### Express Todo App

This is a simple Express.js application for managing todo items.

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Vidhya-Skill-School/NodeJS-S1.git
   ```

2. Navigate to the project directory:

   ```bash
   cd 2.NodeJS/0. Assignments/1.Crud-With-Express
   ```

3. Install dependencies using `pnpm`:

   ```bash
   pnpm install
   ```

#### Usage

Start the server:

```bash
pnpm start
```

The server will start on port `3000` by default.

#### API Endpoints

##### Add Todo

- **Endpoint:** `POST /todos`
- **Request Body:**

  ```json
  {
    "title": "Example Todo",
    "description": "This is an example todo item."
  }
  ```

- **Response:**

  ```json
  {
    "data": {
      "id": "1",
      "title": "Example Todo",
      "description": "This is an example todo item.",
      "timestamp": "2024-03-21T12:00:00.000Z"
    },
    "meta": {
      "message": "Todo added successfully"
    }
  }
  ```

##### Get All Todos

- **Endpoint:** `GET /todos`
- **Response:**

  ```json
  {
    "data": {
      "todos": [
        {
          "id": "1",
          "title": "Example Todo",
          "description": "This is an example todo item.",
          "timestamp": "2024-03-21T12:00:00.000Z"
        }
      ],
      "totalRecords": 1
    },
    "meta": {
      "message": "Todos list found"
    }
  }
  ```

##### Get Todo by ID

- **Endpoint:** `GET /todos/:id`
- **Response (Todo Found):**

  ```json
  {
    "data": {
      "id": "1",
      "title": "Example Todo",
      "description": "This is an example todo item.",
      "timestamp": "2024-03-21T12:00:00.000Z"
    },
    "meta": {
      "message": "Todo details found"
    }
  }
  ```

- **Response (Todo Not Found):**

  ```json
  {
    "data": {},
    "meta": {
      "message": "No todo found with the given ID"
    }
  }
  ```

##### Delete Todo by ID

- **Endpoint:** `DELETE /todos/:id`
- **Response:**

  ```json
  {
    "data": null,
    "meta": {
      "message": "Todo deleted successfully"
    }
  }
  ```

##### Update Todo by ID

- **Endpoint:** `PUT /todos/:id`
- **Request Body:**

  ```json
  {
    "title": "Updated Todo",
    "description": "This is an updated todo item."
  }
  ```

- **Response:**

  ```json
  {
    "data": {
      "id": "1",
      "title": "Updated Todo",
      "description": "This is an updated todo item.",
      "timestamp": "2024-03-21T12:00:00.000Z"
    },
    "meta": {
      "message": "Todo updated successfully"
    }
  }
  ```

#### Postman Collection

To test the API endpoints, you can use the provided Postman collection.

##### Steps to Import Postman Collection:

1. Open Postman.
2. Click on "Import" in the top left corner.
3. Choose "Import From Link" or select from folder.
4. Enter the following URL:
   ```
   https://raw.githubusercontent.com/Vidhya-Skill-School/NodeJS-S1/main/2.NodeJS/0.%20Assignments/1.Crud-With-Express/postman-collection.json?token=GHSAT0AAAAAACLI7D6TXYCX4CEKWEKZJFL2ZP2WBMA
   ```
5. Click "Continue".
6. Review the collection and click "Import".

##### Usage:

1. Select the imported collection from the sidebar.
2. Click on any request to open it.
3. Modify the request parameters if needed.
4. Click on "Send" to execute the request.
5. View the response in the "Response" section.

#### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
