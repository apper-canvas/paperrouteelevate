import customersData from "@/services/mockData/customers.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CustomerService {
  constructor() {
    this.customers = [...customersData];
  }

  async getAll() {
    await delay(300);
    return [...this.customers];
  }

  async getById(Id) {
    await delay(200);
    const customer = this.customers.find(c => c.Id === Id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return { ...customer };
  }

  async create(customerData) {
    await delay(400);
    const newCustomer = {
      Id: Math.max(...this.customers.map(c => c.Id)) + 1,
      ...customerData,
      createdAt: new Date().toISOString(),
    };
    this.customers.push(newCustomer);
    return { ...newCustomer };
  }

  async update(Id, customerData) {
    await delay(350);
    const index = this.customers.findIndex(c => c.Id === Id);
    if (index === -1) {
      throw new Error("Customer not found");
    }
    this.customers[index] = { ...this.customers[index], ...customerData };
    return { ...this.customers[index] };
  }

  async delete(Id) {
    await delay(250);
    const index = this.customers.findIndex(c => c.Id === Id);
    if (index === -1) {
      throw new Error("Customer not found");
    }
    this.customers.splice(index, 1);
    return true;
  }
}

export const customerService = new CustomerService();