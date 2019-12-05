import { Product } from './product';

export interface PurchaseHistory {
    billId: number;
    billDate: Date;
    products: Product;
    quantity: number;
}