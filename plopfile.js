module.exports = function (plop) {
  plop.setGenerator('app-route', {
    description: 'Generate a new Next.js page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the page?',
      },
    ],
    actions: getAppRouteActions(),
  });

  plop.setGenerator('api-route', {
    description: 'Generate a new API route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the API route?',
      },
    ],
    actions: getApiRouteActions(),
  });

  // Combined generator for both app-route and api-route
  plop.setGenerator('page', {
    description: 'Generate both a Next.js page and an API route',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the page and API route?',
      },
    ],
    // Combine actions from both generators
    actions: [
      ...getAppRouteActions(),
      ...getApiRouteActions(),
    ],
  });

  // Function definition for generating the actions for app-route
  function getAppRouteActions() {
    return [
      {
        type: 'add',
        path: 'src/app/{{dashCase name}}s/page.tsx',
        templateFile: 'templates/app-route.hbs',
      },
    ];
  }

  // Function definition for generating the actions for api-route
  function getApiRouteActions() {
    return [
      {
        type: 'add',
        path: 'src/app/api/{{dashCase name}}s/route.ts',
        templateFile: 'templates/api-route.hbs',
      },
    ];
  }
};