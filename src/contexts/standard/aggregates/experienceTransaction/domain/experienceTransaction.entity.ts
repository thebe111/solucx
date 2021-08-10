import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { Contributor } from "./../../contributor/domain/contributor.entity";
import { Customer } from "./../../customer/domain/customer.entity";
import { Shop } from "./../../shop/domain/shop.entity";
import { Exclude, Transform } from "class-transformer";

@Entity({ name: "experience_transactions" })
export class ExperienceTransaction {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "transaction_date" })
    @Transform(({ value }) => new Date(value).toLocaleString("pt-BR", {year: "numeric", month: "2-digit", day: "2-digit"}))
    transactionDate: Date;

    @Column({ type: "float" })
    @Transform(({ value }) => new Intl.NumberFormat("pt-BR", {style: "currency", currency: "BRL"}).format(+value))
    value: string;

    @Exclude()
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Exclude()
    @Column({ default: false })
    deleted: boolean;

    @ManyToOne(() => Customer, (customer) => customer.experienceTransaction, {
        cascade: true,
    })
    @JoinColumn({ name: "id_customer" })
    customer: Customer;

    @ManyToOne(
        () => Contributor,
        (contributor) => contributor.experienceTransaction,
        { cascade: true },
    )
    @JoinColumn({ name: "id_contributor" })
    contributor: Contributor;

    @ManyToOne(() => Shop, (shop) => shop.experienceTransaction, {
        cascade: true,
    })
    @JoinColumn({ name: "id_shop" })
    shop: Shop;

    constructor(experienceTransaction?: Partial<ExperienceTransaction>) {
       Object.assign(this, experienceTransaction);
    }
}
