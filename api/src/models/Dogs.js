const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    id : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey: true
      
    },


    height: {
      type : DataTypes.DECIMAL,
      allowNull : false
    },

    weight: {
      type: DataTypes.DECIMAL,
      allowNull: false
},

    lifeTime: {
      type: DataTypes.INTEGER
}

  // createdInDb = datatypes.boolean
  },
  {timestamps : false} 
  );

};
