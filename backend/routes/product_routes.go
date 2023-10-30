package routes

import (
	"crud/controllers"

	"github.com/gofiber/fiber/v2"
)

func ProductRoutes(app *fiber.App) {
	app.Post("/products/create", controllers.CreateProduct)
	app.Get("/products", controllers.GetProducts)
	app.Get("/products/:id", controllers.GetProduct)
	app.Put("/products/update/:id", controllers.UpdateProduct)
	app.Delete("/products/delete/:id", controllers.DeleteProduct)
	app.Put("/products/restore/:id", controllers.RestoreProduct)
}
