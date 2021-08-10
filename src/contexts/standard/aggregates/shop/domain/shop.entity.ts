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

@Entity({ name: "shops" })
export class Shop {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

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
        (experienceTransaction) => experienceTransaction.shop,
    )
    experienceTransaction: ExperienceTransaction;

    constructor(shop?: Partial<Shop>) {
       Object.assign(this, shop);
    }
}
