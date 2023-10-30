package controllers

import (
	"crud/config"
	"crud/models"

	"github.com/gofiber/fiber/v2"
)

type SuccessResponse struct {
	Status int         `json:"status"`
	Data   interface{} `json:"data"`
}

type ErrorResponse struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

func CreateProduct(c *fiber.Ctx) error {
	product := new(models.Product)

	if err := c.BodyParser(product); err != nil {
		return c.Status(400).JSON(ErrorResponse{Status: 400, Message: "Invalid request"})
	}

	command := config.DB.Debug().Create(product)
	if command.Error != nil {
		return c.Status(500).JSON(ErrorResponse{Status: 500, Message: "Failed to create product"})
	}

	return c.Status(201).JSON(SuccessResponse{Status: 201, Data: product})
}

func GetProducts(c *fiber.Ctx) error {
	var products []models.Product
	command := config.DB.Debug().Order("id asc").Find(&products)

	if command.Error != nil {
		return c.Status(500).JSON(ErrorResponse{Status: 500, Message: "Failed to fetch products"})
	}

	return c.JSON(SuccessResponse{Status: 200, Data: products})
}

func GetProduct(c *fiber.Ctx) error {
	var product models.Product
	command := config.DB.Debug().Unscoped().First(&product, c.Params("id"))
	if command.Error != nil {
		return c.Status(404).JSON(ErrorResponse{Status: 404, Message: "Product not found"})
	}

	return c.JSON(SuccessResponse{Status: 200, Data: product})
}

func UpdateProduct(c *fiber.Ctx) error {
	var product models.Product
	command := config.DB.Debug().First(&product, c.Params("id"))
	if command.Error != nil {
		return c.Status(404).JSON(ErrorResponse{Status: 404, Message: "Product not found"})
	}

	updatedProduct := new(models.Product)
	if err := c.BodyParser(updatedProduct); err != nil {
		return c.Status(400).JSON(ErrorResponse{Status: 400, Message: "Invalid request"})
	}

	product.Name = updatedProduct.Name
	product.Description = updatedProduct.Description
	product.Price = updatedProduct.Price

	config.DB.Save(&product)

	return c.Status(200).JSON(SuccessResponse{Status: 200, Data: product})
}

func DeleteProduct(c *fiber.Ctx) error {
	var product models.Product
	command := config.DB.Debug().First(&product, c.Params("id"))
	if command.Error != nil {
		return c.Status(404).JSON(ErrorResponse{Status: 404, Message: "Product not found"})
	}

	config.DB.Delete(&product)

	return c.JSON(SuccessResponse{Status: 200, Data: "Product soft-deleted"})
}

func RestoreProduct(c *fiber.Ctx) error {
	var product models.Product
	command := config.DB.Debug().Unscoped().First(&product, c.Params("id"))
	if command.Error != nil {
		return c.Status(404).JSON(ErrorResponse{Status: 404, Message: "Product not found"})
	}

	config.DB.Unscoped().Model(&product).Update("DeletedAt", nil)

	return c.JSON(SuccessResponse{Status: 200, Data: "Product restored"})
}
