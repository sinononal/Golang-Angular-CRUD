import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss'],
})
export class ProductAddEditComponent implements OnInit {
  product: Product = {ID: 0, name: '', description: '', price: 0 }; 
  isEditing = false;
  productForm: FormGroup;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      Name: ['', Validators.required], 
      Description: [''], 
      Price: [null, [Validators.required, Validators.min(0)]], 
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {

      this.isEditing = true;
      this.productService.getProduct(Number(id)).subscribe((response) => {
        this.product = response.data;
      });
    }
  }

  saveProduct(): void {
    if (this.product.name !== "" && this.product.price >= 0){
      if (this.isEditing) {
      
        this.productService
        .updateProduct(this.product.ID, this.product)
        .subscribe(
          (response) => {
            if (response.status === 200) {
              Swal.fire({
                title: 'Success!',
                text: 'Product added successfully.',
                icon: 'success',
              });
            } else {
              Swal.fire({
                title: 'Failed!',
                text: 'Failed to add product.',
                icon: 'error',
              });
            }

            this.router.navigate(['/products']);
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'An error occurred while updating the product.',
              icon: 'error',
            });
          }
        );
      
      
    } else {
      // Add a new product
      console.log(this.product);
      this.productService.addProduct(this.product).subscribe(
        (response) => {
          console.log(response);
          
          if (response.status === 201) {
            Swal.fire({
              title: 'Success!',
              text: 'Product added successfully.',
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'Failed!',
              text: 'Failed to add product.',
              icon: 'error',
            });
          }
          this.router.navigate(['/products']);
        },
        (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while adding the product.',
            icon: 'error',
          });
        }
      );
    }
    } else {
      Swal.fire({
        title: 'Failed!',
        text: 'Please Enter Name',
        icon: 'warning',
      });
    }
    
  }
}
