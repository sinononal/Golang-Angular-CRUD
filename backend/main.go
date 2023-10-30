package main

import (
	"log"

	"crud/config"
	"crud/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	app := fiber.New()
	corsConfig := config.LoadCorsConfig()
	config.ConfigureCors(app, corsConfig)
	config.InitDatabase()
	routes.ProductRoutes(app)

	app.Listen(":3000")
}
