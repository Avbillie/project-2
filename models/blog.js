module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define("Blog", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Blog;
};
