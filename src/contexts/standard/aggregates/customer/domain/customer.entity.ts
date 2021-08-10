import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { ExperienceTransaction } from "./../../experienceTransaction/domain/experienceTransaction.entity";

@Entity({ name: "customers" })
export class Customer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    CPF: string;

    @Exclude()
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Exclude()
    @Column({ default: false })
    deleted: boolean;

    @OneToMany(
        () => ExperienceTransaction,
        (experienceTransaction) => experienceTransaction.customer,
    )
    experienceTransaction: ExperienceTransaction;

    constructor(customer?: Partial<Customer>) {
       Object.assign(this, customer);
    }
}
