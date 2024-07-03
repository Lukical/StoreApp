module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("products",{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      brand:{
        type: Sequelize.STRING,
        allowNull: false
      },
      description:{
        type: Sequelize.STRING,
        allowNull: false
      },
      price:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      img:{
        type: Sequelize.STRING
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  }
};
