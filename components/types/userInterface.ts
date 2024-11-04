interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
}

interface Address {
    id: number;
    country: string
    city: string
    street: string
    postalCode: string
}

type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'canceled';

interface Order {
    id: number;
    createdAt: string;
    status: OrderStatus;
}