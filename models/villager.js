module.exports = (sequelize, Datatypes) => {
  const Villager = sequelize.define("Villager", {
    name: Datatypes.STRING,
  });

  Villager.associate = (models) => {
    Villager.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Villager;
};
