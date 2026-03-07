import { Component, OnInit } from '@angular/core';
import { CoffeeItemService, CoffeeItem } from './coffee-item.service';

@Component({
  selector: 'coffeetalk-root',
  templateUrl: './coffeetalk.component.html',
  styleUrls: ['./coffeetalk.component.css']
})
export class CoffeeTalkComponent implements OnInit {
  getStars(rating: number): string[] {
    const stars: string[] = [];
    let r = Number(rating);
    for (let i = 0; i < 5; i++) {
      if (r >= 1) {
        stars.push('★'); // full star
        r -= 1;
      } else if (r === 0.5) {
        stars.push('⯨'); // half star (U+2BE8)
        r -= 0.5;
      } else {
        stars.push('☆'); // empty star
      }
    }
    return stars;
  }
  // Modal for item details
  showDetailDialog = false;
  selectedItem: CoffeeItem | null = null;
  openDetailDialog(item: CoffeeItem) {
    this.selectedItem = item;
    this.showDetailDialog = true;
  }
  closeDetailDialog() {
    this.showDetailDialog = false;
    this.selectedItem = null;
  }
    // For Add New dialog
    showAddDialog = false;
    newImage: string | null = null;
    newBrand = '';
    newName = '';
    newType = '';
    newCountryOfOrigin = '';
    newBeanVariety = '';
    newNotes = '';
    newRating: number = 3;
    ratingOptions: number[] = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

  canAddNewCoffee(): boolean {
    return this.newBrand.trim().length > 0 && this.newName.trim().length > 0;
  }

    openAddDialog() {
      this.showAddDialog = true;
      this.showMenu = false;
      this.newImage = null;
      this.newBrand = '';
      this.newName = '';
      this.newRating = 3;
    }

    closeAddDialog() {
      this.showAddDialog = false;
      this.newImage = null;
      this.newBrand = '';
      this.newName = '';
      this.newRating = 3;
    }

    onImageSelected(event: any) {
      const file = event.target.files[0];
      if (file && file.type.match('image.*')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.cropToSquare(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        this.newImage = null;
      }
    }

    cropToSquare(dataUrl: string) {
      const img = new window.Image();
      img.onload = () => {
        const size = 400;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Crop to center square
          const minDim = Math.min(img.width, img.height);
          const sx = (img.width - minDim) / 2;
          const sy = (img.height - minDim) / 2;
          ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
          this.newImage = canvas.toDataURL('image/jpeg');
        } else {
          this.newImage = dataUrl;
        }
      };
      img.src = dataUrl;
    }

    addNewCoffee() {
      console.log('addNewCoffee called', this.newBrand, this.newName, 'newRating:', this.newRating);
      if (this.newBrand && this.newName) {
        const imageToUse = this.newImage ? this.newImage : this.generateBrownImage();
        // Ensure rating is within allowed values
        let validRatings = [0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5];
        let inputRating = this.newRating !== undefined ? this.newRating : 3;
        console.log('inputRating:', inputRating);
        if (!validRatings.includes(inputRating)) {
          inputRating = 3;
        }
        const newItem: CoffeeItem = {
          image: imageToUse,
          brand: this.newBrand,
          name: this.newName,
          type: this.newType,
          countryOfOrigin: this.newCountryOfOrigin,
          beanVariety: this.newBeanVariety,
          notes: this.newNotes,
          rating: inputRating,
          timestamp: new Date().toISOString()
        };
        this.coffeeItemService.add(newItem);
        this.closeAddDialog();
      }
    }
  title = 'Coffee Talk';
  showMenu = false;

  coffeeItems: CoffeeItem[] = [];
  // ...existing code...

  private randomBrands = [
    'Mocha Bros', 'Latte Co', 'Espresso Express', 'Cappuccino House', 'Americano Ltd',
    'Macchiato Makers', 'Ristretto Roasters', 'Affogato Artisans', 'Cortado Cafe', 'Doppio Drinks',
    'Irish Brew', 'Turkish Delight', 'Vienna Beans', 'Flatwhite Friends', 'Lungo Lounge',
    'Redeye Roasters', 'Piccolo Place', 'Borgia Beans', 'Mazagran Market', 'Galao Group'
  ];
  private randomNames = [
    'Sunrise', 'Velvet', 'Harmony', 'Bliss', 'Fusion', 'Dream', 'Pulse', 'Twist', 'Echo', 'Aura',
    'Flare', 'Nova', 'Zen', 'Rush', 'Spark', 'Muse', 'Vibe', 'Chill', 'Roast', 'Drift'
  ];

  constructor(private coffeeItemService: CoffeeItemService) {}

  ngOnInit() {
    this.coffeeItemService.getAll().subscribe(items => {
      this.coffeeItems = items;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  closeMenu() {
    this.showMenu = false;
  }

  randomBrand(): string {
    return this.randomBrands[Math.floor(Math.random() * this.randomBrands.length)];
  }

  randomName(): string {
    return this.randomNames[Math.floor(Math.random() * this.randomNames.length)];
  }

  randomRating(): number {
    return Math.floor(Math.random() * 5) + 1;
  }

  // Generate a 400x400 brown square as a base64 JPEG
  generateBrownImage(): string {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = this.randomBrown();
      ctx.fillRect(0, 0, 400, 400);
    }
    return canvas.toDataURL('image/jpeg');
  }

  randomBrown(): string {
    const browns = [
      '#4B2E05', '#7B3F00', '#8B5C2A', '#A0522D', '#C19A6B', '#6F4E37',
      '#8B4513', '#A67B5B', '#B87333', '#7C482B', '#5C4033', '#9C661F',
      '#A1866F', '#7E5C3E', '#A9746E', '#8D5524'
    ];
    return browns[Math.floor(Math.random() * browns.length)];
  }

  // ...existing code...
}
