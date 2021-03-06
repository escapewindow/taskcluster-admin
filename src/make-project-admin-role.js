import editRole from './util/edit-role';

module.exports.setup = (program) => {
  return program
    .command('make-project-admin-role <project>')
    .option('-n, --noop', 'Don\'t change roles, just show difference')
    .description('create or update a project-admin role');
};

module.exports.run = async (project, options) => {
  var taskcluster = require('taskcluster-client');
  var chalk = require('chalk');
  var auth = new taskcluster.Auth();

  var roleId = 'project-admin:' + project;
  var scopes = [
    'assume:project:<project>:*',
    'assume:hook-id:project-<project>/*',
    'auth:create-client:project/<project>/*',
    'auth:create-role:hook-id:project-<project>/*',
    'auth:create-role:project:<project>:*',
    'auth:delete-client:project/<project>/*',
    'auth:delete-role:hook-id:project-<project>/*',
    'auth:delete-role:project:<project>:*',
    'auth:disable-client:project/<project>/*',
    'auth:enable-client:project/<project>/*',
    'auth:reset-access-token:project/<project>/*',
    'auth:update-client:project/<project>/*',
    'auth:update-role:hook-id:project-<project>/*',
    'auth:update-role:project:<project>:*',
    'hooks:modify-hook:project-<project>/*',
    'hooks:trigger-hook:project-<project>/*',
    'project:<project>:*',
    'queue:get-artifact:project/<project>/*',
    'queue:route:index.project.<project>.*',
    'index:insert-task:project.<project>.*',
    'secrets:get:project/<project>/*',
    'secrets:set:project/<project>/*',
  ].map((scope) => scope.replace('<project>', project));

  var description = [
    '*DO NOT EDIT*',
    '',
    'Project administrative scopes for ' + project,
    '',
    'This role is configured automatically by [taskcluster-admin](https://github.com/taskcluster/taskcluster-admin).',
  ].join('\n');

  await editRole({
    roleId,
    description,
    scopes,
    noop: options.noop,
  });
};

