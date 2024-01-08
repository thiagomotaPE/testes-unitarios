import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  constructor(user?: Partial<User>) {
    this.id = user?.id;
    this.nome = user?.nome;
    this.sobrenome = user?.sobrenome;
  }
}
