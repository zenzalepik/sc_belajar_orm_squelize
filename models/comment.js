module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  });

  // Asosiasi dengan model Post dan User
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      foreignKey: 'postId',
      as: 'post',
    });
    Comment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };

  return Comment;
};
