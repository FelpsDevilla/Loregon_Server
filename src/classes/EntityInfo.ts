import { Expose } from "class-transformer";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class EntityInfo{
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column({ type: 'varchar', nullable: false })
    name: string;
    
    @Expose()
    @CreateDateColumn()
    createdAt: Date;

    @Expose()
    @UpdateDateColumn()
    updatedAt: Date;
}