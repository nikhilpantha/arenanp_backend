module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allowed subject types — keep close to Conventional Commits defaults plus
    // a couple of common extras the team is likely to want.
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'docs', // docs only
        'style', // formatting, white-space, etc. (no code change)
        'refactor', // code change that neither fixes a bug nor adds a feature
        'perf', // performance improvement
        'test', // adding or updating tests
        'build', // build system / deps changes
        'ci', // CI config changes
        'chore', // misc tooling, no production impact
        'revert', // reverts a previous commit
      ],
    ],
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
    'subject-max-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 120],
  },
};
