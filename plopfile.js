
const templateRootPath = 'plop_templates';
const componentRootPath = 'src/js/components';

const componentTemplatePath = `${templateRootPath}/component`;

module.exports = (plop) => {
  const generatedComponentPath = `${componentRootPath}/{{snakeCase componentName}}`;
  const STATEFUL = 'stateful';
  const STATELESS = 'stateless';

  plop.setGenerator('component', {
    descripiton: 'Create a new component',

    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the component name?',
        validate: (val) => {
          if (val.trim()) {
            return true;
          }
          return 'component name should NOT be empty';
        }
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'Is your component stateful or stateless?' +
        'A stateful component is generated as a class, ' +
        'while a stateless component is generated as a function',
        choices: [
          STATEFUL,
          STATELESS
        ]
      },
    ],

    actions: (userInput) => {
      let viewTemplateFile;
      switch (userInput.componentType) {
        case STATEFUL:
          viewTemplateFile = `${componentTemplatePath}/stateful/view.js`;
          break;

        case STATELESS:
          viewTemplateFile = `${componentTemplatePath}/stateless/view.js`;
          break;

        default:
          console.error('Something is wrong. You should not reach here');
          process.abort();
      }

      const actionConfig = [
        {
          type: 'add',
          path: `${generatedComponentPath}/view.js`,
          templateFile: viewTemplateFile
        },
        {
          type: 'add',
          path: `${generatedComponentPath}/index.js`,
          templateFile: `${componentTemplatePath}/index.js`,
        },
        {
          type: 'add',
          path: `${generatedComponentPath}/reducer.js`,
          templateFile: `${componentTemplatePath}/reducer.js`,
        },
        {
          type: 'add',
          path: `${generatedComponentPath}/actions.js`,
          templateFile: `${componentTemplatePath}/actions.js`,
        },
        {
          type: 'add',
          path: `${generatedComponentPath}/actionTypes.js`,
          templateFile: `${componentTemplatePath}/actionTypes.js`,
        },
        {
          type: 'add',
          path: `${generatedComponentPath}/container.js`,
          templateFile: `${componentTemplatePath}/container.js`,
        }
      ];

      return actionConfig;
    }

  });
};
