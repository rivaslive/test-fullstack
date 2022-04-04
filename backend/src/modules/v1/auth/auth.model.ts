import { DataTypes, Model } from '@sequelize/core';
import { db } from '../../../services/server/db';

export interface UserInstance extends Model {
  id: number;
  firstName: string;
  lastName: string;
  codeStudent: string;
  thumbnail: string;
  email: string;
  password: string;
  role: 'student' | 'librarian';
}

const User = db.define<UserInstance>(
  'User',
  {
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(250),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(500), // encrypt password
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'student',
      validate: {
        customValidator: (value) => {
          const enums = ['student', 'librarian']
          if (!enums.includes(value)) {
            throw new Error('not a valid option')
          }
        }
      },
    },
  },
  {
    // Other model options go here
  }
);

User.sync({ alter: true }).then(() => {
  console.log('User table created or updated');
});

export default User;
