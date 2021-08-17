'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('likes', {
      user_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
      },
      article_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'articles', key: 'id' },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('likes')
  },
}