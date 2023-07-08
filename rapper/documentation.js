const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
      title: "Demo",
      version: "0.0.1",
      description: "This is a documented API for URL shortlinking",
    },
    servers: [
      
      {
        url: "https://altcapstone.onrender.com/",
        description: "Production environment",
      },
    ],
    tags: [
      {
        name: "signup",
        description: "Signup route",
      },
      {
        name: "login",
        description: "Login route",
      },
      {
        name: "logout",
        description: "Logout route",
      },
      {
        name: "google",
        description: "Google authentication routes",
      },
      {
        name: "dashboard",
        description: "Dashboard routes",
      },
      {
        name: "create",
        description: "URL creation route",
      },
      {
        name: "redirect",
        description: "URL redirection route",
      },
    ],
    paths: {
      "/signup": {
        post: {
          tags: ["signup"],
          description: "Sign up route",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                    confirmpassword: {
                      type: "string",
                    },
                  },
                  example: {
                    email: "user@example.com",
                    password: "password",
                    confirmpassword: "password",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      // Provide an example response object here
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/login": {
        get: {
          tags: ["login"],
          summary: "Render login form",
        },
        post: {
          tags: ["login"],
          summary: "User login",
          requestBody: {
            required: true,
            content: {
              "application/x-www-form-urlencoded": {
                schema: {
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                  example: {
                    email: "user@example.com",
                    password: "password",
                  },
                },
              },
            },
          },
          responses: {
            302: {
              description: "Login successful",
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
      },
      "/logout": {
        get: {
          tags: ["logout"],
          summary: "User logout",
          responses: {
            302: {
              description: "Logout successful",
            },
          },
        },
      },
      "/google": {
        get: {
          tags: ["google"],
          summary: "Redirect to Google for authentication",
        },
      },
      "/google/callback": {
        get: {
          tags: ["google"],
          summary: "Google authentication callback",
          responses: {
            302: {
              description: "Redirect to the dashboard",
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
      },
      "/dashboard": {
        get: {
          tags: ["dashboard"],
          summary: "Render the dashboard",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Dashboard rendered successfully",
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
      },
      "/create": {
        post: {
          tags: ["create"],
          summary: "Create a URL",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/x-www-form-urlencoded": {
                schema: {
                  type: "object",
                  properties: {
                    original: {
                      type: "string",
                    },
                    short: {
                      type: "string",
                    },
                  },
                  example: {
                    original: "http://example.com",
                    short: "example",
                  },
                },
              },
            },
          },
          responses: {
            302: {
              description: "URL created successfully",
            },
            401: {
              description: "Unauthorized",
            },
          },
        },
      },
      "/{slug}": {
        get: {
          tags: ["redirect"],
          summary: "Redirect to the original URL",
          parameters: [
            {
              in: "path",
              name: "slug",
              required: false,
              schema: {
                type: "string",
              },
            },
          ],
          responses: {
            302: {
              description: "Redirect to the original URL",
            },
            200: {
              description: "Index page rendered successfully",
            },
          },
        },
      },
    },
  };
  
  module.exports = swaggerDocumentation;