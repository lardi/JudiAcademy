//services/WPServices.js
const WP_BASE_URL = "https://judiacademy.com/wp-json";

export const login = async (username, password) => {
    const endpoint = `${WP_BASE_URL}/jwt-auth/v1/token`;
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        // Inside your login function
        const data = await response.json();
        return { token: data.token, user: data.user || {} };

    } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to login');
        console.log("Login function called with", username, password);

    }
};

export const getUserInfo = async (token) => {
    const endpoint = `${WP_BASE_URL}/wp/v2/users/me`;
    
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch user info');
    }
};

// Add more API calls as needed.
export const fetchCourses = async () => {
    const endpoint = `${WP_BASE_URL}/ldlms/v1/sfwd-courses?_embed`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to fetch courses');
    }
};

// Add other API calls as needed
