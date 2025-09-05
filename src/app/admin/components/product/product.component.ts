import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;
  @ViewChild('closeModal') closeModal!: ElementRef;

  productList: Product[] = [];
  newProduct: Partial<Product> = {
    name: '',
    price: 0,
    type: '',
    ratio: '',
    power: '',
    material: '',
    features: '',
    description: ''
  };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  openAddProductModal(): void {
    // Reset the form
    this.newProduct = {
      name: '',
      price: 0,
      type: '',
      ratio: '',
      power: '',
      material: '',
      features: '',
      description: ''
    };
    
    // Show the modal
    const modal = document.getElementById('addProductModal');
    if (modal) {
      const modalInstance = new (window as any).bootstrap.Modal(modal);
      modalInstance.show();
    }
  }

  addProduct(): void {
    if (this.productForm.valid) {
      // Auto-increment ID (temporary until we have a proper backend)
      const newId = this.productList.length > 0 
        ? Math.max(...this.productList.map(p => p.id || 0)) + 1 
        : 1;
      
      const productToAdd: Product = {
        ...this.newProduct,
        id: newId,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Product;

      // Add to the list (in a real app, you would call your service here)
      this.productList = [...this.productList, productToAdd];
      
      // Close the modal
      const modal = document.getElementById('addProductModal');
      if (modal) {
        const modalInstance = (window as any).bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      }

      // Reset the form
      this.productForm.resetForm();
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (      data: Product[]) => this.productList = data,
      (      err: any) => console.error('Error loading products', err)
    );
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.productList = this.productList.filter(p => p.id !== id);
      });
    }
  }

  edit(id: number): void {
    this.router.navigate(['/updateproduct', id]);
  }
}
