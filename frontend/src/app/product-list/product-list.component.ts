import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { ProductResponse } from '../product-response.model';
import { ProductData } from '../product-data.model';
import Swal from 'sweetalert2';

interface ApiResponse {
  status: number;
  data: ProductData[];
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: ProductData[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((response: ApiResponse) => {
      if (response.status === 200) {
        this.products = response.data;
        console.log(response.data);
      }
    });
  }

  deleteProduct(productId: number): void {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
            this.getProducts();
          },
          (error) => {
            Swal.fire('Error', 'Failed to delete the product', 'error');
          }
        );
      }
    });
  }
}
