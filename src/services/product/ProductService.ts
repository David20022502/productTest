import { FinancialProductType } from '../../interface/Product';
import {RequestHandler} from '../../modules/RequestHandler';
import {CustomUtils} from '../../utils/CustomConstans';

class ProductServiceClass {
  private productRequest;
  private pathUrl;
  constructor() {
    this.productRequest = new RequestHandler({
      baseUrl: CustomUtils.envVars.productServerHost,
      headers: {
        authorId: '10502502',
      },
    });
    this.pathUrl = '/bp/products';
  }

  async getProducts() {
    const {data} = await this.productRequest.get({
      pathUrl: this.pathUrl,
    });
    return data as FinancialProductType[];
  }
  async addProduc(values: FinancialProductType) {
    const {data} = await this.productRequest.post({
      pathUrl: this.pathUrl,
      body: values,
    });
    return data;
  }
  async deleteProduct(id: string) {
    const {data} = await this.productRequest.delete({
      pathUrl: this.pathUrl,
      keyDelete: {
        id: id,
      },
    });
    return data;
  }
  async updateProduct(values: FinancialProductType) {
    const {data} = await this.productRequest.put({
      pathUrl: this.pathUrl,
      body: values,
    });
    return data;
  }
  async existingProduct(id: string) {
    const {data} = await this.productRequest.get({
      pathUrl: `${this.pathUrl}/verification`,
      pathParamas: {
        id,
      },
    });
    return data;
  }
}
export const productService = new ProductServiceClass();
