"use strict";

module.exports = {
    up: function(migration, DataTypes, done) {
        migration.createTable(
            'User', {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4
                },
                createdAt: {
                    type: DataTypes.DATE
                },
                updatedAt: {
                    type: DataTypes.DATE
                },
                deletedAt: {
                    type: DataTypes.DATE
                },
                email: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: true
                },
                name: {
                    type: DataTypes.STRING,
                    unique: false,
                    allowNull: false
                },
                phone: {
                    type: DataTypes.STRING,
                    unique: true,
                    allowNull: false
                },
                lat: {
                    type: DataTypes.FLOAT,
                    unique: false,
                    allowNull: true
                },
                lon: {
                    type: DataTypes.FLOAT,
                    unique: false,
                    allowNull: true
                }
            }
        );
        done();
    },

    down: function(migration, DataTypes, done) {
        migration.dropAllTables();
        done();
    }
};