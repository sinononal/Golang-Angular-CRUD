package config

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

type CorsConfig struct {
	AllowOrigins     string
	AllowMethods     string
	AllowCredentials bool
}

func LoadCorsConfig() CorsConfig {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	return CorsConfig{
		AllowOrigins:     os.Getenv("CORS_ALLOW_ORIGINS"),
		AllowMethods:     os.Getenv("CORS_ALLOW_METHODS"),
		AllowCredentials: os.Getenv("CORS_ALLOW_CREDENTIALS") == "true",
	}
}

func ConfigureCors(app *fiber.App, corsConfig CorsConfig) {
	app.Use(cors.New(cors.Config{
		AllowOrigins:     corsConfig.AllowOrigins,
		AllowMethods:     corsConfig.AllowMethods,
		AllowCredentials: corsConfig.AllowCredentials,
	}))
}
