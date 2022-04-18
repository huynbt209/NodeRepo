module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Role", {
      role_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      role_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    await queryInterface.createTable("User", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      time_off_total: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      time_off_remain: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      is_locked: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Role",
          key: "role_id",
        },
      },
    });

    await queryInterface.createTable("Request", {
      request_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      request_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      time_off: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "user_id",
        },
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Role");
    await queryInterface.dropTable("User");
    await queryInterface.dropTable("Request");
  }
};
