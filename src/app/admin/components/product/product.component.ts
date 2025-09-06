import { Component, OnInit, ViewChild } from '@angular/core';
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

  productList: Product[] = [];
  newProduct: Product = this.initProduct();

  // 🔹 These need to be public so template can use them
  public editMode = false;
  public editingId: number | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  public initProduct(): Product {
    return {
      name: '',
      model: '',
      category: '',
      price: 0,
      type: '',
      ratio: '',
      power: '',
      material: '',
      features: '',
      description: '',
      image: ''
    };
  }

  public loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.productList = data),
      error: (err) => console.error('Error loading products', err)
    });
  }

  // 🔹 Make saveProduct public
  public saveProduct(): void {
    if (this.productForm.valid) {
      if (this.editMode && this.editingId !== null) {
        // update
        this.productService.updateProduct(this.editingId, this.newProduct).subscribe({
          next: (updated: Product) => {
            this.productList = this.productList.map(p =>
              p.id === updated.id ? updated : p
            );
            this.resetForm();
          },
          error: (err: any) => console.error('Error updating product', err)
        });
      } else {
        // create
        this.productService.addProduct(this.newProduct).subscribe({
          next: (saved: Product) => {
            this.productList.push(saved);
            this.resetForm();
          },
          error: (err: any) => console.error('Error saving product', err)
        });
      }
    }
  }

  // 🔹 Make resetForm public
  public resetForm(): void {
    this.newProduct = this.initProduct();
    this.editMode = false;
    this.editingId = null;
    if (this.productForm) {
      this.productForm.resetForm();
    }
  }

  // Handle image selection and preview
  public onImageSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Update the product's image with the base64 data URL
        this.productList[index].image = reader.result as string;
        // Reset the input value to allow selecting the same file again
        input.value = '';
      };
      reader.readAsDataURL(file);
    }
  }

  public changeImage(event: Event, index: number): void {
    event.stopPropagation();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => this.onImageSelected(e, index);
    input.click();
  }

  public removeImage(event: Event, index: number): void {
    event.stopPropagation();
    this.productList[index].image = '';
  }

  public edit(product: Product): void {
    this.editMode = true;
    this.editingId = product.id!;
    this.newProduct = { ...product };
  }

  public delete(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.productList = this.productList.filter(p => p.id !== id);
        },
        error: (err) => console.error('Error deleting product', err)
      });
    }
  }
}
