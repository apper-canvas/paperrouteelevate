import publicationsData from "@/services/mockData/publications.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PublicationService {
  constructor() {
    this.publications = [...publicationsData];
  }

  async getAll() {
    await delay(300);
    return [...this.publications];
  }

  async getById(Id) {
    await delay(200);
    const publication = this.publications.find(p => p.Id === Id);
    if (!publication) {
      throw new Error("Publication not found");
    }
    return { ...publication };
  }

  async create(publicationData) {
    await delay(400);
    const newPublication = {
      Id: Math.max(...this.publications.map(p => p.Id)) + 1,
      ...publicationData,
      createdAt: new Date().toISOString(),
    };
    this.publications.push(newPublication);
    return { ...newPublication };
  }

  async update(Id, publicationData) {
    await delay(350);
    const index = this.publications.findIndex(p => p.Id === Id);
    if (index === -1) {
      throw new Error("Publication not found");
    }
    this.publications[index] = { ...this.publications[index], ...publicationData };
    return { ...this.publications[index] };
  }

  async delete(Id) {
    await delay(250);
    const index = this.publications.findIndex(p => p.Id === Id);
    if (index === -1) {
      throw new Error("Publication not found");
    }
    this.publications.splice(index, 1);
    return true;
  }
}

export const publicationService = new PublicationService();