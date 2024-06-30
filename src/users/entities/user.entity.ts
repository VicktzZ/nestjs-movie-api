import { Entity, PrimaryColumn, Column, BeforeInsert } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nanoid } = require('nanoid');

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @BeforeInsert()
  generateId() {
    this.id = `user_${nanoid()}`;
  }
}
