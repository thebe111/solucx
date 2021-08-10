import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";
import { ExperienceTransaction } from "./../../experienceTransaction/domain/experienceTransaction.entity";
import { Exclude } from "class-transformer";

@Entity({ name: "rates" })
export class Rate {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    score: number;

    @Column()
    comment: string;

    @Exclude()
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Exclude()
    @Column({ default: false })
    deleted: boolean;

    @OneToOne(() => ExperienceTransaction)
    @JoinColumn({ name: "id_experience_transaction" })
    experienceTransaction: ExperienceTransaction;

    constructor(rate?: Partial<Rate>) {
       Object.assign(this, rate);
    }
}
