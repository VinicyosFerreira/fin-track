import { protectedApi, publicApi } from '@/lib/axios';

const UserService = {
  /** 
     Create a new user account
     * @param {Object} variables User the signup details
     * @param {string} variables.firstName the user's first name
     * @param {string} variables.lastName  the user's last name
     * @param {string} variables.email the user's email address
     * @param {string} variables.password the user's password
     * @returns {Promise<Object>} The created a user
     * @returns {Promise<string>} response.tokens the user's tokens
  */
  signup: async (variables) => {
    const response = await publicApi.post('/api/users', {
      first_name: variables.firstName,
      last_name: variables.lastName,
      email: variables.email,
      password: variables.password,
    });

    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    };
  },

  /**
      Authenticate user and retrieve tokens
      * @param {Object} variables  User login details
      * @param {string} variables.email  the user's email address
      * @param {string} variables.password  the user's password
      * @returns {Promise<Object>} The logged in user 
      * @returns {Promise<string>} response.tokens the user's tokens
   */
  login: async (variables) => {
    const response = await publicApi.post('api/users/login', {
      email: variables.email,
      password: variables.password,
    });
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
      tokens: response.data.tokens,
    };
  },

  /**
        Retrieve tokens refresh and access tokens
      * @returns {Promise<Object>} The user authenticated
   */
  me: async () => {
    const response = await protectedApi.get('api/users/me');
    return {
      id: response.data.id,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      email: response.data.email,
    };
  },

  getBalance: async (variables) => {
    // vamos passar os queries params
    const queryParams = new URLSearchParams(variables);
    queryParams.set('from', variables.from);
    queryParams.set('to', variables.to);

    const url = `api/users/me/balance?${queryParams.toString()}`;

    const response = await protectedApi.get(url);
    return {
      earnings: response.data.earnings,
      expenses: response.data.expenses,
      investments: response.data.investments,
      earningsPercentage: response.data.earnings_percentage,
      expensesPercentage: response.data.expenses_percentage,
      investmentsPercentage: response.data.investments_percentage,
      balance: response.data.balance,
    };
  },
};

export { UserService };
