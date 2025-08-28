export interface SignupData {
  name: string;
  email: string;
  password: string;
  username: string;
  surname: string;
}

export interface UserData {
  _id: string;
  username: string;
  email: string;
  name: string;
  verified: boolean;
  roles: string[];
  languages: string[];
  readPosts: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SignupResponse {
  status: string;
  message: string;
  data: UserData;
  token: string;
}

export interface LoginCredentials {
  emailOrUsername: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  userData: UserData;
}

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await fetch('https://king-prawn-app-x9z27.ondigitalocean.app/api/authentication/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    // Handle different error response formats
    const errorMessage = responseData.message || 
                        responseData.error?.message || 
                        'Signup failed. Please try again.';
    throw new Error(errorMessage);
  }

  return responseData;
};

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch('https://king-prawn-app-x9z27.ondigitalocean.app/api/authentication/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    const errorMessage = responseData.message || 
                        responseData.error?.message || 
                        'Login failed. Please check your credentials and try again.';
    throw new Error(errorMessage);
  }

  // Store the token in localStorage or your preferred auth state management
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', responseData.token);
    localStorage.setItem('user', JSON.stringify(responseData.userData));
  }

  return responseData;
};

export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
};

export const getCurrentUser = (): UserData | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};