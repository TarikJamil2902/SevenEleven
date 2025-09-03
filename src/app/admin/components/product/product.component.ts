import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  isEditing = false;
  selectedProduct: Product | null = null;
  products: Product[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      type: ['', Validators.required],
      ratio: ['', Validators.required],
      power: ['', Validators.required],
      material: ['', Validators.required],
      features: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      }
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      return;
    }

    const productData = this.productForm.value;
    
    if (this.isEditing && this.selectedProduct && this.selectedProduct.id) {
      // Update existing product
      this.productService.update(this.selectedProduct.id, productData).subscribe({
        next: () => {
          this.load();
          this.resetForm();
        },
        error: (err) => console.error('Error updating product:', err)
      });
    } else {
      // Create new product
      this.productService.create(productData).subscribe({
        next: () => {
          this.load();
          this.resetForm();
        },
        error: (err) => console.error('Error creating product:', err)
      });
    }
  }

  editProduct(product: Product) {
    this.selectedProduct = { ...product };
    this.isEditing = true;
    this.productForm.patchValue({
      name: product.name,
      model: product.model || '',
      category: product.category || '',
      price: product.price || 0,
      type: product.type || '',
      ratio: product.ratio || '',
      power: product.power || '',
      material: product.material || '',
      features: product.features || '',
      description: product.description || ''
    });
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.delete(id).subscribe({
        next: () => {
          this.load();
          if (this.selectedProduct && this.selectedProduct.id === id) {
            this.resetForm();
          }
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }

  resetForm() {
    this.productForm.reset();
    this.isEditing = false;
    this.selectedProduct = null;
  }

  newProduct() {
    this.resetForm();
  }

  // Helper to access form controls easily in template
  get f() { return this.productForm.controls; }

  cancel() {
    this.resetForm();
  }
}