module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Role', [
      {
        role_name: 'Admin',
      },
      {
        role_name: 'Staff',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Role', null, {});
  }
};
