import fs from "fs";


class Product {
  constructor(title, description, price, thumbnail, code, stock,status, id) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = [thumbnail];
    this.code = code;
    this.stock = stock;
    this.status= status;
    this.id = id;
  }
  static id = 0;
}

export class ProductManager {
  #products;
  #productDirPath;
  #productFilePath;

  constructor() {
    this.#products = [];
    this.#productDirPath = '../files';
    this.#productFilePath = `${this.#productDirPath}/Products.json`;
  }

    // createProduct = async (title, description, price, thumbnail, code, stock,status, id) => {
    //     let sumador = 0;
    //     for (let i = 0; i < this.#products.length; i++) {
    //     if (this.#products[i].code === code) {
    //         console.log(`El código ${code} está repetido`);
    //         sumador++;
    //         break;
    //     }
    //     }
    //     if (sumador === 0 && id === 0) {
    //         Product.id++;
    //         let newProduct = new Product(title, description, price, thumbnail, code, stock,status, (id = Product.id));
    //         console.log('Crear Producto: producto a registrar:');
    //         console.log(newProduct);

    //         try {
    //             await fs.promises.mkdir(this.#productDirPath, { recursive: true });
    //             try {
    //             await fs.promises.writeFile(this.#productFilePath, '[]');
    //             } catch (error) {
    //                 await console.log('error');
    //             }

    //         let productsFile = await fs.promises.readFile(this.#productFilePath, 'utf-8');
    //         this.#products = JSON.parse(productsFile);

    //         console.log('Productos encontrados:');
    //         console.log(this.#products);-
    //         this.#products.push(newProduct);
    //         console.log('Lista actualizada de productos:');
    //         console.log(this.#products);

    //         await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));
    //         return {code: 200, status: 'Producto agregado'};
    //         } catch (error) {
    //             console.error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
    //             throw Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
    //         }
        
    //     } 
    //     else if (sumador === 0 && id !== 0) {

    //         let newProduct = new Product(title, description, price, thumbnail, code, stock,status, id);
    //         console.log('Crear Producto: producto a registrar:');
    //         console.log(newProduct);

    //         try {
    //             await fs.promises.mkdir(this.#productDirPath, { recursive: true });
    //             try {
    //                 await fs.promises.stat(this.#productFilePath);
    //             } catch (error) {
    //             await fs.promises.writeFile(this.#productFilePath, '[]');
    //         }

    //       let productsFile = await fs.promises.readFile(this.#productFilePath, 'utf-8');
    //       this.#products = JSON.parse(productsFile);

    //       console.log('Productos encontrados:');
    //       console.log(this.#products);
    //       this.#products.push(newProduct);
    //       console.log('Lista actualizada de productos:');
    //       console.log(this.#products);
        
    //       await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));
    //       return {code: 200, status: 'Producto agregado'};
    //       } catch (error) {
    //         console.error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
    //         throw Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
    //       }
    //     }
    //  }

    createProduct = async (title, description, price, thumbnail, code, stock, status, id) => {
        const isCodeRepeated = this.#products.some((product) => product.code === code);
      
        if (isCodeRepeated) {
          console.log(`El código ${code} está repetido`);
          return { code: 400, status: 'Código de producto repetido' };
        }
      
        if (id === 0) {
          Product.id++;
          id = Product.id;
        }
      
        const newProduct = new Product(title, description, price, thumbnail, code, stock, status, id);
        console.log('Crear Producto: producto a registrar:');
        console.log(newProduct);
      
        try {
          await fs.promises.mkdir(this.#productDirPath, { recursive: true });
          const productsFileExists = await fs.promises.stat(this.#productFilePath).catch(() => false);
      
          if (!productsFileExists) {
            await fs.promises.writeFile(this.#productFilePath, '[]');
          }
      
          const productsFile = await fs.promises.readFile(this.#productFilePath, 'utf-8');
          this.#products = JSON.parse(productsFile);
      
          console.log('Productos encontrados:');
          console.log(this.#products);
      
          this.#products.push(newProduct);
          console.log('Lista actualizada de productos:');
          console.log(this.#products);
      
          await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));
          return { code: 200, status: 'Producto agregado' };
        } catch (error) {
          console.error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
          throw new Error(`Error creando producto nuevo: ${JSON.stringify(newProduct)}, detalle del error: ${error}`);
        }
      }
      

    productList = async () => {
        try {

            //leemos el archivo
            let productsFile = await fs.promises.readFile(this.#productFilePath, "utf-8");


            //Obtenemos el JSON String 
            console.info("Archivo JSON obtenido desde archivo: ");
            console.log(productsFile);
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados: ");
            console.log(this.#products);
            return this.#products;

        } catch (error) {
            console.error(`Error consultando los productos por archivo, valide el archivo: ${this.#productDirPath}, 
                detalle del error: ${error}`);
            throw Error(`Error consultando los productos por archivo, valide el archivo: ${this.#productDirPath},
             detalle del error: ${error}`);
        }
    }  
    //Leer productos por ID
    getProductsbyID = async (id) => {
        if(!this.#products.find((prod)=> prod.id === id)){
            console.log("Producto buscado por ID:NOT FOUND");
        }
        else
        {            const produ=this.#products.find((prod)=> prod.id === id);
            console.log("Objeto obtenido por ID = ");
            console.log(this.#products.find((prod)=> prod.id === id));
            return (JSON.stringify(produ));
        }
    }

    // elimino un producto a traves de un id

    deleteProduct = async (id) => {
        const index = this.#products.findIndex(prod => prod.id === id);
        // console.log(`Producto proximo a ser eliminado:v ${this.#products[index].title} ID numero: ${this.#products[index].id}`);
        this.#products.splice(index, 1);
        await fs.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2, '\t'));
        console.log("Lista actualizada de productos desde el programa: ");
        console.log(this.#products);
        console.log("Lista actualizada de productos desde el archivo: ");
        let productsFile = await fs.promises.readFile(this.#productFilePath, "utf-8");
        console.log(productsFile);
        console.log("Producto eliminado correctamente");
        return true;
    }
   



    //Actualizar un producto pidiendo su informacion

    async updateProduct (title, description, price, thumbnail, code, stock,status,id){ 
        const index = this.#products.findIndex(obj => obj.id === id);
        console.log(`El siguiente producto va a ser updateado por:${title} description: ${description}`);
        await this.deleteProduct(id);
        const updateado=await this.createProduct(title,description,price,thumbnail,code,stock,status,id);
        if (updateado){
            return (JSON.stringify(updateado));
        }
        
    }
    
    
}
  



