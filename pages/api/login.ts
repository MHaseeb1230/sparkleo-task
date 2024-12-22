// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const users = [
  { id: 1, email: 'test@example.com', password: 'password123', name: 'John Doe' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Log the incoming request data for debugging
      console.log('Request body:', req.body);

      // Find user with matching credentials
      const user = users.find((u) => u.email === email && u.password === password);

      if (!user) {
        console.error('Invalid credentials');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        'secretkey',
        { expiresIn: '1h' }
      );

      // Respond with the token and user data
      return res.status(200).json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
