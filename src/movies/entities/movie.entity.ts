import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { nanoid } = require('nanoid');
@Entity()
export class Movie {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  gender: string;

  @Column()
  year: string;

  @Column()
  director: string;

  @BeforeInsert()
  generateId() {
    this.id = `movie_${nanoid()}`;
  }
}
