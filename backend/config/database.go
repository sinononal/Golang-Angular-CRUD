package config

import (
	"crud/models"
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDatabase() {
	pgHost := os.Getenv("PG_HOST")
	pgUser := os.Getenv("PG_USER")
	pgPassword := os.Getenv("PG_PASSWORD")
	pgDBName := os.Getenv("PG_DB_NAME")
	pgPort := os.Getenv("PG_PORT")

	dsn := fmt.Sprintf("user=%s password=%s dbname=%s host=%s port=%s sslmode=disable", pgUser, pgPassword, pgDBName, pgHost, pgPort)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to the database")
	}
	db.AutoMigrate(&models.Product{})
	DB = db
}
