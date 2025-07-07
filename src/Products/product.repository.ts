import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductDto } from "./product.dto";


@Injectable()
export class ProductRepository{

    private products = [
        {
            id: 1,
            name: "Auriculares Bluetooth",
            description: "Auriculares inalámbricos con cancelación de ruido y batería de larga duración.",
            price: 79.99,
            stock: true,
            imgUrl: "https://example.com/images/auriculares.jpg"
          },
          {
            id: 2,
            name: "Teclado Mecánico",
            description: "Teclado mecánico con retroiluminación RGB y switches azules.",
            price: 59.99,
            stock: true,
            imgUrl: "https://example.com/images/teclado.jpg"
          },
          {
            id: 3,
            name: "Mouse Gamer",
            description: "Mouse óptico con sensor de alta precisión y botones programables.",
            price: 39.99,
            stock: false,
            imgUrl: "https://example.com/images/mouse.jpg"
          },
          {
            id: 4,
            name: "Monitor 24'' Full HD",
            description: "Monitor LED de 24 pulgadas con resolución 1920x1080 y entrada HDMI.",
            price: 149.99,
            stock: true,
            imgUrl: "https://example.com/images/monitor.jpg"
          }
    ];
    async getProducts(){
        return this.products;
    }
    async getIdProduct(id: number) {
      return this.products.find((product) => product.id === id)
    }

  //  async updateProductRepo(id: string, productDto: ProductDto) {
  //   const product = await this.getIdProduct(+id);
  //   if (!product) throw new NotFoundException("Producto no encontrado");
  
  //   const index = this.products.findIndex(p => p.id === id);
  //   this.products[index] = { ...this.products[index], ...productDto };
  
  //   return this.products[index];
  // }
  async deleteProductRepo(id: number) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException("Producto no encontrado");
  
    const deleted = this.products.splice(index, 1);
    return { message: "Producto eliminado", product: deleted[0] };
  }
  
  
}