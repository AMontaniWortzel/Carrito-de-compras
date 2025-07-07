import { Injectable} from "@nestjs/common";



@Injectable()
export class UsersRepository{
    private users = [
        {
            id: 1,
            email: "juan.perez@example.com",
            name: "Juan Pérez",
            password: "juan1234",
            address: "Calle Falsa 123",
            phone: "+54 11 2345-6789",
            country: "Argentina",
            city: "Buenos Aires"
          },
          {
            id: 2,
            email: "maria.gomez@example.com",
            name: "María Gómez",
            password: "maria5678",
            address: "Av. Libertad 456",
            phone: "+34 91 123-4567",
            country: "España",
            city: "Madrid"
          },
          {
            id: 3,
            email: "carlos.lopez@example.com",
            name: "Carlos López",
            password: "carlosabcd",
            address: "Rua das Flores 789",
            phone: "+55 21 9876-5432"
            // sin country ni city
          },
          {
            id: 4,
            email: "ana.torres@example.com",
            name: "Ana Torres",
            password: "ana2025",
            address: "Main St 101",
            phone: "+1 555-1234",
            country: "USA"
            // sin city
          }
    ];
    
}