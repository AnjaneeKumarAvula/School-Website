# Login Credentials

The application now uses credential-based authentication instead of direct login.

## Demo Accounts

### Parent Account
- **Email:** parent@example.com
- **Password:** parent123

### Teacher Account
- **Email:** teacher@example.com
- **Password:** teacher123

## How to Login

1. Go to the home page at http://localhost:5173/
2. Click on "Go to Parent Login" or "Go to Teacher Login"
3. Enter the credentials above
4. You will be redirected to the respective dashboard upon successful authentication

## Notes

- Invalid credentials will display an error message
- Authentication tokens are stored in localStorage
- For production, passwords should be hashed using bcrypt and JWT should be used for tokens
